import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
// import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("check if the page renders", () => {
    render(<App />);
    const linkElement = screen.getByText(/Pokemon/i);
    expect(linkElement).toBeInTheDocument();
  });
});
