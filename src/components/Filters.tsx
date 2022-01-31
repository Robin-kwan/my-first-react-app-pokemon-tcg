import React from 'react';

interface IFilters {
    sets: string[];
    rarities: string[];
    types: string[];
    clearSet: () => void;
    clearRarity: () => void;
    clearType: () => void;
    set: string;
    rarity: string;
    type: string;
    handleSetChange: (s: string) => void;
    handleRarityChange: (s: string) => void;
    handleTypeChange: (s: string) => void;
}

export const Filters: React.FC<IFilters> = props => {

    return (
        <div className="display-flex">
            <div className="dropdown">
                <button className="dropbtn">Set <img src={require("../assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
                <div className="dropdown-content">
                {props.clearSet()}
                {props.sets.map((item, index) => {
                    return <a key={index} className={(item === props.set) ? "selected-option" : ""} onClick={ () => {props.handleSetChange(item)}} href="/#">{item}</a>
                })}
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Rarity <img src={require("../assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
                <div className="dropdown-content">
                {props.clearRarity()}
                {props.rarities.map((item, index) => {
                    return <a key={index} className={(item === props.rarity) ? "selected-option" : ""} onClick={ () => {props.handleRarityChange(item)}} href="/#">{item}</a>
                })}
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Type <img src={require("../assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
                <div className="dropdown-content move-left">
                {props.clearType()}
                {props.types.map((item, index) => {
                    return <a key={index} className={(item === props.type) ? "selected-option" : ""} onClick={ () => {props.handleTypeChange(item)}} href="/#">{item}</a>
                })}
                </div>
            </div>
        </div>
    )

}