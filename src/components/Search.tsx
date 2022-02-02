import React from "react";
import { useItemContext } from "../store/ContextProvider";

export const Search: React.FC = () => {
  const { action } = useItemContext();
  return (
    <div className="relative display-flex">
      <img
        src={require("../assets/magnify.svg").default}
        alt="magnify-icon"
        className="search-name-icon"
      />
      <input
        id="searchName"
        type="text"
        className="search-name-input"
        placeholder="Search by Name"
        onChange={action.handleNameChange}
      />
    </div>
  );
};
