import React, { useState, useEffect } from 'react';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  // variables and states
  const [cards, setCards] = useState<any[]>([]);
  const [totalFilteredCards, setTotalFilteredCards] = useState<any[]>([]);
  const [filteredCards, setfilteredCards] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const itemPerPage = 20;
  const [set, setSet] = useState<String>("");
  const [sets, setSets] = useState<any[]>([]);
  const [rarity, setRarity] = useState<String>("");
  const [rarities, setRarities] = useState<any[]>([]);
  const [type, setType] = useState<String>("");
  const [types, setTypes] = useState<any[]>([]);
  const [name, setName] = useState<String>("");
  const [drawer, setDrawer] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);
  
  // this will run once when component is created
  useEffect(() => {
    getData();
    async function getData() {
      // get all pokemon cards ( max 250 due to the API )
      PokemonTCG.getAllCards()
      .then((result: any) => {
        console.log(result)
        const data = result;
        // initial card setup
        setCards(data);
        getCards(data);
        setTotalFilteredCards(data);
        const setData = [];
        const rarityData = [];
        const typeData = [];
        for(let i = 0; i < data.length; i++){
          // get set list
          if(!setData.includes(data[i].set.name)){
            setData.push(data[i].set.name);
          }
          // get rarity list
          if(!rarityData.includes(data[i].rarity) && (data[i].rarity !== undefined)){
            rarityData.push(data[i].rarity)
          }
          // get type list
          for(let y = 0; y < data[i].types.length; y++){
            if(!typeData.includes(data[i].types[y])){
              typeData.push(data[i].types[y]);
            }
          }
        }
        // sort lists alphabetically
        setData.sort();
        rarityData.sort();
        typeData.sort();
        // set lists
        setSets(setData);
        setRarities(rarityData);
        setTypes(typeData);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);

  // get max 20 cards based on current page 
  function getCards(items: any) {
    const data = [];
    for(let i = (itemPerPage * currentPage - itemPerPage); i < (itemPerPage * currentPage); i++){
      if(items[i]){
        data.push(items[i]);
      }
    }
    setfilteredCards(data);
  }
  
  // get total page amount if filteredCards is changed
  useEffect(() => {
    findTotalPage()    
  }, [totalFilteredCards]);

  // get total page amount
  function findTotalPage() {
    setTotalPage(Math.ceil(totalFilteredCards.length / itemPerPage));
  }

  // set page
  function selectPage(n: number) {
    setCurrentPage(n);
  }
  
  // Call getCards when currentPage changed
  useEffect(() => {
    getCards(totalFilteredCards)
  }, [currentPage])

  // set set
  function handleSetChange(set: string){
    setSet(set);
  };
  
  // set rarity
  function handleRarityChange(rarity: string){
    setRarity(rarity);
  }

  // set type
  function handleTypeChange(type: string){
    setType(type);
  }

  // set name + make it case insensitive
  const handleNameChange = (event) => {
    setName(event.target.value.toLowerCase());
  }
  
  // trigger when filter is used
  useEffect(() => {
    let totalFilteredItems = cards;
    // filter by name + make it case insensitive
    if(name.length > 0){
      totalFilteredItems = totalFilteredItems.filter(item => item.name.toLowerCase().includes(name));
    }
    // filter by set name
    if(set){
      totalFilteredItems = totalFilteredItems.filter(item => item.set.name === set);
    }
    // filter by rarity
    if(rarity){
      totalFilteredItems = totalFilteredItems.filter(item => item.rarity === rarity);
    }
    // filter by type
    if(type){
      totalFilteredItems = totalFilteredItems.filter(item => item.types.includes(type));
    }
    // set filtered cards to find total page amount
    setTotalFilteredCards(totalFilteredItems);
    // get max 20 filtered cards
    getCards(totalFilteredItems);
    // reset current page to 1
    selectPage(1);
  }, [name, set, rarity, type]);
  
  // clear set option appears when a set has been selected
  function clearSet(){
    const value = set;
    if(value){
      return <a onClick={ () => setSet("")} className="clear-option" href="/#"> Clear Set </a>
    }
  }

  // clear rarity option appears when a rarity has been selected
  function clearRarity(){
    const value = rarity;
    if(value){
      return <a onClick={ () => setRarity("")} className="clear-option" href="/#"> Clear Rarity </a>
    }
  }

  // clear type option appears when a type has been selected
  function clearType(){
    const value = type;
    if(value){
      return <a onClick={ () => setType("")} className="clear-option" href="/#"> Clear Type </a>
    }
  }

  // add the item to cart
  function addToCart(item: any) {
    // create initial amount of the item
    item.amount = 1;
    setCart(cart => [...cart, item]);
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

  // check if item with the id already exist in the cart
  function alreadyInCart(id: string) {
    return cart.some(item => item.id === id)
  }

  // remove 1 card from the card amount if the amount is 0 then remove it from the cart
  function removeItem(index: number) {
    const data = [...cart];
    if(data[index].amount > 1){
      data[index].amount = data[index].amount - 1;
    }
    else{
      data.splice(index, 1)
    }
    setCart(data);
  }

  // add 1 card to the card amount
  function addMore(index: number) {
    const data = [...cart];
    data[index].amount = data[index].amount + 1;
    setCart(data);
  }

  // if cart contains items, shows the item amount in the cart
  function cartBadge() {
    if(cart.length > 0){
      return <div className="cart-badge"> {cart.length} </div>
    }
  }
  
  // sum up price of every items in the cart
  function sumUpPrice() {
    let price = 0;
    for(let i = 0; i < cart.length; i++){
      price = price + (cart[i].cardmarket.prices.averageSellPrice * cart[i].amount);
    }
    return (Math.round(((price) + Number.EPSILON) * 100) / 100).toLocaleString()
  }

  // Filters (Set, Rarity, Type)
  function Filters(){
    return <div className="display-flex">
    <div className="dropdown">
      <button className="dropbtn">Set <img src={require("./assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
      <div className="dropdown-content">
        {clearSet()}
        {sets.map((item, index) => {
          return <a key={index} className={(item === set) ? "selected-option" : ""} onClick={ () => {handleSetChange(item)}} href="/#">{item}</a>
        })}
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">Rarity <img src={require("./assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
      <div className="dropdown-content">
        {clearRarity()}
        {rarities.map((item, index) => {
          return <a key={index} className={(item === rarity) ? "selected-option" : ""} onClick={ () => {handleRarityChange(item)}} href="/#">{item}</a>
        })}
      </div>
    </div>
    <div className="dropdown">
      <button className="dropbtn">Type <img src={require("./assets/arrow-down.svg").default} alt="arrow-down-icon" className="arrow-down" /> </button>
      <div className="dropdown-content move-left">
        {clearType()}
        {types.map((item, index) => {
          return <a key={index} className={(item === type) ? "selected-option" : ""} onClick={ () => {handleTypeChange(item)}} href="/#">{item}</a>
        })}
      </div>
    </div>
    </div>
  }
  return (
    <div className="App">
      {/* Import Poppins font */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet"></link>
      {/* Cart Drawer  */}
      <Drawer 
      anchor="right" 
      open={drawer} 
      onClose={() => setDrawer(false)} 
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
              <span className="clear-all unselectable" onClick={() => setCart([])}> Clear all </span>
            </div>
            <button className="cart-btn" onClick={() => setDrawer(false)}>
              <img src={require("./assets/cancel.svg").default} alt="cancel-icon" className="cancel-btn-icon" />
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
            {cart.map((item, index) => {
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
                    <button className="square-btn" onClick={() => removeItem(index)}>
                      <span className="font-btn"> - </span>
                    </button>
                  </div>
                  <div className="qty-column">
                    <button className="qty-display">
                      <span className="font-btn"> {item.amount} </span>
                    </button>
                  </div>
                  <div className="price-column">
                    <button className={`square-btn ${(item.set.total === item.amount) ? "disabled-btn" : ""}`} onClick={() => addMore(index)}>
                      <span className="font-btn"> + </span>
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
              <span> {cart.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)} </span>
            </div>
            <div className="display-flex space-between margin-top-16">
              <span className="price-font"> Total Price </span>
              <span> $ {sumUpPrice()} </span>
            </div>
            <button className="payment-btn"> Continue to Payment </button>
          </div>
        </Box>
      </Drawer>
      {/* Main div */}
      <div className="main">
        {/* Header bar */}
        <div className="display-flex space-between">
          <span className="header-font white-text unselectable"> Pokemon market </span>
          <div className="display-flex">
            <div className="display-flex relative text-field-large-screen">
              <img src={require("./assets/magnify.svg").default} alt="magnify-icon" className="search-name-icon" />
              <input type="text" className="search-name-input" placeholder="Search by Name" onChange={handleNameChange} />
            </div>
            <div className="relative">
              {cartBadge()}
              <button className="cart-btn" onClick={() => setDrawer(true)}>
                <img src={require("./assets/cart.svg").default} alt="cart-icon" className="cart-btn-icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="display-flex relative text-field-small-screen">
          <img src={require("./assets/magnify.svg").default} alt="magnify-icon" className="search-name-icon" />
          <input type="text" className="search-name-input" placeholder="Search by Name" onChange={handleNameChange} />
        </div>
        {/* Dividing line */}
        <div className="dividing-line line-margin" />
        {/* Content div */}
        <div className="display-flex space-between">
          <span className="subheader-font white-text unselectable"> Choose Card </span>
          {/* Filter for large screen */}
          <div className="filter-large">
            <Filters />
          </div>
        </div>
        {/* Filter for small screen */}
        <div className="filter-small justify-center">
          <Filters />
        </div>
        {/* Card box */}
        <div className="display-flex">
          {filteredCards.map((item, index)=>{
            return <div key={index} className="item-flex-box"> 
              <div className="item-card">
                <img src={item.images.small} alt="card" />
                <div className="subcard">
                  <div className="name-box">
                    <span> {item.name} </span>
                  </div>
                  <div className="etc-box">
                    <span> $ {item.cardmarket.prices.averageSellPrice} </span>
                    <div className="dot" />
                    {totalCard(item.set.total)}
                  </div>
                  <button className={`add-to-cart ${((item.set.total === 0) || alreadyInCart(item.id)) ? "disabled-btn" : ""}`} onClick={() => { addToCart(item)}}>
                    <div className="display-flex">
                      <img src={require("./assets/cart.svg").default} alt="cart-icon" />
                      <span> Add to Cart </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          })}
        </div>
        {/* Pagination */}
        <div className="display-flex justify-center unselectable">
          <div className="pagination">
            {Array.from({ length: totalPage}, (_, i) =>
              <span key={i} className={((i+1) === currentPage) ? "underlined" : ""} onClick={() => {
                selectPage(i+1);
              }}>{i+1}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
