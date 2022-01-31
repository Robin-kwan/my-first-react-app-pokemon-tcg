import React from 'react';


interface ICard {
    item: any;
    alreadyInCart: (id: string) => void;
    addToCart: (item: any) => void;
}

// if total card = 0 return Out of Stock. Otherwise, return n Cards
function totalCard(n: number) {
    if(n){
        return <span> {n} Cards </span>
    }
    else{
        return <span> Out of Stock </span>
    }
}

export const Card: React.FC<ICard> = props => {
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
                        {totalCard(props.item.set.total)}
                    </div>
                    <button className={`add-to-cart ${((props.item.set.total === 0) || props.alreadyInCart(props.item.id)) ? "disabled-btn" : ""}`} onClick={() => { props.addToCart(props.item)}}>
                        <div className="display-flex">
                            <img src={require("../assets/cart.svg").default} alt="cart-icon" />
                            <span> Add to Cart </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}