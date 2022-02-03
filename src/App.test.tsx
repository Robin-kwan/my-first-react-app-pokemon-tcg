import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Search } from "./components/Search";
import { Filter } from "./components/Filter";
import { Card } from "./components/Card";
import { Cart } from "./components/Cart";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { ItemContext } from "./store/ContextProvider";

//Main page
describe("App", () => {
  it("check if the page renders", () => {
    render(<App />);
    const linkElement = screen.getByText(/Pokemon/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("check if loading component works", () => {
    render(<App />);
    const progress = screen.getByTestId("progressCheck");
    expect(progress).toBeInTheDocument();
  });
});

//Search bar
describe("Search", () => {
  const value = {
    action: {
      handleNameChange: jest.fn(),
    },
  };
  beforeEach(() => {
    render(
      <ItemContext.Provider value={value}>
        <Search />
      </ItemContext.Provider>
    );
  });
  it("check if the search text field renders", () => {
    expect(screen.getByPlaceholderText("Search by Name")).toHaveValue("");
    userEvent.type(screen.getByPlaceholderText("Search by Name"), "Four");
    expect(screen.getByPlaceholderText("Search by Name")).toHaveValue("Four");
  });
});

//Filter
describe("Filter", () => {
  const value = {
    sets: ["sample-set"],
    rarities: ["sample-rarity"],
    types: ["sample-type"],
    action: {
      clearSet: jest.fn(),
      clearRarity: jest.fn(),
      clearType: jest.fn(),
      setSet: jest.fn(),
      setRarity: jest.fn(),
      setType: jest.fn(),
    },
  };
  beforeEach(() => {
    render(
      <ItemContext.Provider value={value}>
        <Filter />
      </ItemContext.Provider>
    );
  });
  it("check if the filter renders", () => {
    const set = screen.getByText("Set");
    const rarity = screen.getByText("Rarity");
    const type = screen.getByText("Type");
    expect(set).toBeInTheDocument();
    expect(rarity).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });

  it("check if set set works", () => {
    const menu = screen.getByText("sample-set");
    userEvent.click(menu);
    expect(value.action.setSet).toHaveBeenCalledWith("sample-set");
  });

  it("check if set rarity works", () => {
    const menu = screen.getByText("sample-rarity");
    userEvent.click(menu);
    expect(value.action.setRarity).toHaveBeenCalledWith("sample-rarity");
  });

  it("check if set type works", () => {
    const menu = screen.getByText("sample-type");
    userEvent.click(menu);
    expect(value.action.setType).toHaveBeenCalledWith("sample-type");
  });
});

//Card
describe("Card", () => {
  const mockedCard = {
    id: "pl1-1",
    name: "Ampharos",
    set: {
      total: 133,
    },
    rarity: "Rare Holo",
    images: {
      small: "https://images.pokemontcg.io/pl1/1.png",
    },
    cardmarket: {
      prices: {
        averageSellPrice: 4.37,
      },
    },
  };
  const value = {
    action: {
      alreadyInCart: jest.fn(),
      addToCart: jest.fn(),
    },
  };
  beforeEach(() => {
    render(
      <ItemContext.Provider value={value}>
        <Card item={mockedCard as any} />
      </ItemContext.Provider>
    );
  });
  it("check if the card renders", () => {
    const name = screen.getByText("Ampharos");
    const avgPrice = screen.getByText(/4.37/i);
    const total = screen.getByText(/133/i);
    expect(name).toBeInTheDocument();
    expect(avgPrice).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });

  it("check if function addToCart works", () => {
    const btn = screen.getByText(/Add to Cart/i);
    userEvent.click(btn);
    expect(value.action.addToCart).toHaveBeenCalledTimes(1);
  });
});

//Cart
describe("Cart", () => {
  const mockedCard1 = {
    name: "Bulbasaur",
    set: {
      total: 18,
    },
    rarity: "Rare Holo",
    images: {
      small: "https://images.pokemontcg.io/pl1/1.png",
    },
    cardmarket: {
      prices: {
        averageSellPrice: 0.44,
      },
    },
    amount: 2,
  };
  const mockedCard2 = {
    name: "Caterpie",
    set: {
      total: 12,
    },
    rarity: "Rare Holo",
    images: {
      small: "https://images.pokemontcg.io/pl1/1.png",
    },
    cardmarket: {
      prices: {
        averageSellPrice: 1.56,
      },
    },
    amount: 3,
  };
  const value = {
    drawer: true,
    cart: [mockedCard1, mockedCard2],
    action: {
      removeItem: jest.fn(),
      addMore: jest.fn(),
    },
  };
  beforeEach(() => {
    render(
      <ItemContext.Provider value={value}>
        <Cart />
      </ItemContext.Provider>
    );
  });
  it("Check if the cart renders", () => {
    const cart = screen.getByText("Cart");
    expect(cart).toBeInTheDocument();
  });
  it("Check if the item is in the cart", () => {
    const name1 = screen.getByText("Bulbasaur");
    const name2 = screen.getByText("Caterpie");
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
  });
  it("Check if the total card amount is correct", () => {
    const n = mockedCard1.amount + mockedCard2.amount;
    const amount = screen.getByText(n);
    expect(amount).toBeInTheDocument();
  });
  it("Check if the total price is correct", () => {
    const n =
      mockedCard1.cardmarket.prices.averageSellPrice * mockedCard1.amount +
      mockedCard2.cardmarket.prices.averageSellPrice * mockedCard2.amount;
    const price = screen.getByText("$ " + n);
    expect(price).toBeInTheDocument();
  });
});
