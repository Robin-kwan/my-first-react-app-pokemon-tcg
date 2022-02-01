import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from './components/Pagination';
import { Card } from './components/Card';
import { Filter } from './components/Filter';
import { Cart } from './components/Cart';
import { useItemContext } from './store/ContextProvider';

function Home() {
    const { ready, cart, filteredCards, action } = useItemContext();
    return (
        <div className="App">
            {/* Import Poppins font */}
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet"></link>
            {/* Cart Drawer  */}
            <Cart />
            {/* Main div */}
            <div className="main">
                {/* Header bar */}
                <div className="display-flex space-between">
                    <span className="header-font white-text unselectable"> Pokemon market </span>
                    <div className="display-flex">
                        {/* Search field for large screen */}
                        <div className="display-flex relative text-field-large-screen">
                            <img src={require("./assets/magnify.svg").default} alt="magnify-icon" className="search-name-icon" />
                            <input type="text" className="search-name-input" placeholder="Search by Name" onChange={action.handleNameChange} />
                        </div>
                        <div className="relative">
                            {/* cart badge */}
                            {(cart.length > 0) && <div className="cart-badge"> {cart.length} </div>}
                            <button className="cart-btn" onClick={() => action.setDrawer(true)}>
                                <img src={require("./assets/cart.svg").default} alt="cart-icon" className="cart-btn-icon" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Search field for small screen */}
                <div className="display-flex relative text-field-small-screen">
                    <img src={require("./assets/magnify.svg").default} alt="magnify-icon" className="search-name-icon" />
                    <input type="text" className="search-name-input" placeholder="Search by Name" onChange={action.handleNameChange} />
                </div>
                {/* Dividing line */}
                <div className="dividing-line line-margin" />
                    {/* Content div */}
                    <div className="display-flex space-between">
                        <span className="subheader-font white-text unselectable"> Choose Card </span>
                        {/* Filter for large screen */}
                        <div className="filter-large">
                            <Filter />
                        </div>
                    </div>
                {/* Filter for small screen */}
                <div className="filter-small justify-center">
                    <Filter />
                </div>
                {/* loading */}
                {!ready && <div className="loading"> <CircularProgress /> </div>}
                {/* Card displaying */}
                <div className="display-flex">
                    {filteredCards.map((item, index)=>{
                        return <Card key={index} item={item} />
                    })}
                </div>
                {/* Pagination */}
                <Pagination />
            </div>
        </div>
    );
}

export default Home;
