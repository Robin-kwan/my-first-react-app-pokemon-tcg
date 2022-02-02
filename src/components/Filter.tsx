import React from "react";
import { useItemContext } from "../store/ContextProvider";

export const Filter: React.FC = () => {
  const { set, sets, rarity, rarities, type, types, action } = useItemContext();
  return (
    <div className="display-flex">
      <div className="dropdown">
        <button className="dropbtn">
          Set
          <img
            src={require("../assets/arrow-down.svg").default}
            alt="arrow-down-icon"
            className="arrow-down"
          />
        </button>
        <div className="dropdown-content">
          {action.clearSet()}
          {sets.map((item, index) => {
            return (
              <a
                key={index}
                className={item === set ? "selected-option" : ""}
                onClick={() => {
                  action.setSet(item);
                }}
                href="/#"
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Rarity
          <img
            src={require("../assets/arrow-down.svg").default}
            alt="arrow-down-icon"
            className="arrow-down"
          />
        </button>
        <div className="dropdown-content">
          {action.clearRarity()}
          {rarities.map((item, index) => {
            return (
              <a
                key={index}
                className={item === rarity ? "selected-option" : ""}
                onClick={() => {
                  action.setRarity(item);
                }}
                href="/#"
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          Type
          <img
            src={require("../assets/arrow-down.svg").default}
            alt="arrow-down-icon"
            className="arrow-down"
          />
        </button>
        <div className="dropdown-content move-left">
          {action.clearType()}
          {types.map((item, index) => {
            return (
              <a
                key={index}
                className={item === type ? "selected-option" : ""}
                onClick={() => {
                  action.setType(item);
                }}
                href="/#"
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
