import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

interface ICart {
    drawer: boolean;
    itemsInCart: any;
    setCart: (arr: any[]) => void;
    setDrawer: (boolean: boolean) => void;
    removeItem: (n: number) => void;
    addMore: (n: number) => void;
}

export const Cart: React.FC<ICart> = props => {

    // sum up price of every items in the cart
    function sumUpPrice() {
        let price = 0;
        for(let i = 0; i < props.itemsInCart.length; i++){
            price = price + (props.itemsInCart[i].cardmarket.prices.averageSellPrice * props.itemsInCart[i].amount);
        }
        return (Math.round(((price) + Number.EPSILON) * 100) / 100).toLocaleString();
    }
    
    return (
        <Drawer 
        anchor="right" 
        open={props.drawer} 
        onClose={() => props.setDrawer(false)} 
        PaperProps={{
            sx: {
            backgroundColor: "#1F1D2B",
            color: "white",
            }
        }}>
            <Box sx={{p: 4}} className="parent">
            {/* Header of the cart drawer */}
            <div className="display-flex space-between">
                <div>
                <span className="header-font unselectable"> Cart </span>
                <br />
                <span className="clear-all unselectable" onClick={() => props.setCart([])}> Clear all </span>
                </div>
                <button className="cart-btn" onClick={() => props.setDrawer(false)}>
                <img src={require("../assets/cancel.svg").default} alt="cancel-icon" className="cancel-btn-icon" />
                </button>
            </div>
            {/* Column headers */}
            <div className="display-flex cart-row-margin">
                <div className="item-column">
                Item
                </div>
                <div className="qty-column">
                Qty
                </div>
                <div className="price-column">
                Price
                </div>
            </div>
            <div className="dividing-line" />
            {/* Item list */}
            <div className="cart-item-div">
                {props.itemsInCart.map((item, index) => {
                return <div key={index} className="item-card-cart">
                    <div className="display-flex align-default">
                    <div className="item-column">
                        <img src={item.images.small} alt="card" />
                    </div>
                    <div className="qty-column">
                        <span> {item.name} </span>
                        <br />
                        <span className="price-font"> $ {item.cardmarket.prices.averageSellPrice} </span>
                    </div>
                    <div className="price-column">
                        <span> $ {(Math.round(((item.cardmarket.prices.averageSellPrice * item.amount) + Number.EPSILON) * 100) / 100).toLocaleString()} </span>
                    </div>
                    </div>
                    <div className="display-flex margin-top-10">
                    <div className="item-column">
                        <button className="square-btn" onClick={() => props.removeItem(index)}>
                        <span className="font-btn unselectable"> - </span>
                        </button>
                    </div>
                    <div className="qty-column">
                        <button className="qty-display">
                        <span className="font-btn"> {item.amount} </span>
                        </button>
                    </div>
                    <div className="price-column">
                        <button className={`square-btn ${(item.set.total === item.amount) ? "disabled-btn" : ""}`} onClick={() => props.addMore(index)}>
                        <span className="font-btn unselectable"> + </span>
                        </button>
                    </div>
                    </div>
                </div>
                })}
            </div>
            {/* Bottom part of the cart */}
            <div className="bottom-part">
                <div className="display-flex space-between margin-top-16">
                <span className="price-font"> Total Card Amount </span>
                <span> {props.itemsInCart.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)} </span>
                </div>
                <div className="display-flex space-between margin-top-16">
                <span className="price-font"> Total Price </span>
                <span> $ {sumUpPrice()} </span>
                </div>
                <button className="payment-btn"> Continue to Payment </button>
            </div>
            </Box>
        </Drawer>
    )
    
}