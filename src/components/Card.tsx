import React from "react";
import { useItemContext } from "../store/ContextProvider";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

interface ExtendedCard extends PokemonTCG.Card {
  cardmarket?: any;
}

interface ICard {
  item: ExtendedCard;
}

export const Card: React.FC<ICard> = (props) => {
  const { action } = useItemContext();
  return (
    <div className="item-flex-box">
      <div className="item-card">
        <img src={props.item.images.small} alt="card" />
        <div className="subcard">
          <div className="name-box">
            <span> {props.item.name} </span>
          </div>
          <div className="etc-box">
            <span> $ {props.item.cardmarket.prices.averageSellPrice} </span>
            <div className="dot" />
            <span>
              {props.item.set.total
                ? props.item.set.total + " cards"
                : "Out of stock"}
            </span>
          </div>
          <button
            className={`add-to-cart ${
              props.item.set.total === 0 || action.alreadyInCart(props.item.id)
                ? "disabled-btn"
                : ""
            }`}
            onClick={() => {
              action.addToCart(props.item);
            }}
          >
            <div className="display-flex">
              <img
                src={require("../assets/cart.svg").default}
                alt="cart-icon"
              />
              <span> Add to Cart </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
