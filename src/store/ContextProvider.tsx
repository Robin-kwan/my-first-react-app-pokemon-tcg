import React, { useState, useEffect, createContext, useContext } from 'react';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

const ItemContext = createContext<any>({});

export function useItemContext(){
    return useContext(ItemContext)
}

function ContextProvider({children}) {
    // states
    const [ready, setReady] = useState<boolean>(false);
    const [cards, setCards] = useState<PokemonTCG.Card[]>([]);
    const [totalFilteredCards, setTotalFilteredCards] = useState<any[]>([]);
    const [filteredCards, setfilteredCards] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const itemPerPage = 20;
    const [set, setSet] = useState<string>("");
    const [sets, setSets] = useState<string[]>([]);
    const [rarity, setRarity] = useState<string>("");
    const [rarities, setRarities] = useState<string[]>([]);
    const [type, setType] = useState<any>(null);
    const [types, setTypes] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [drawer, setDrawer] = useState<boolean>(false);
    const [cart, setCart] = useState<any[]>([]);
    
    // this will run once when component is created
    useEffect(
        getData
    , []);

    // get new list of cards when filter is changed
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
        setCurrentPage(1);
    }, [name, set, rarity, type]);

    // get total page amount if filteredCards is changed
    useEffect(() => {
        findTotalPage()    
    }, [totalFilteredCards]);

    // get new 20 cards when currentPage is changed
    useEffect(() => {
        getCards(totalFilteredCards)
    }, [currentPage])

    // setup function
    function getData() {
        // get all pokemon cards ( max 250 due to the API )
        PokemonTCG.getAllCards()
        .then((result: PokemonTCG.Card[]) => {
            console.log(result)
            const data = result;
            // initial card setup
            setCards(data);
            getCards(data);
            setReady(true);
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

    // get max 20 cards based on the current page index 
    function getCards(items: PokemonTCG.Card[]) {
        const data = [];
        for(let i = (itemPerPage * currentPage - itemPerPage); i < (itemPerPage * currentPage); i++){
            if(items[i]){
                data.push(items[i]);
            }
        }
        setfilteredCards(data);
    }

    // get total page amount
    function findTotalPage() {
        setTotalPage(Math.ceil(totalFilteredCards.length / itemPerPage));
    }

    // set name + make it case insensitive
    const handleNameChange = (event) => {
        setName(event.target.value.toLowerCase());
    }
    
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

    const contextStore = {
        ready,
        cards,
        totalFilteredCards,
        filteredCards,
        currentPage,
        totalPage,
        set,
        sets,
        rarity,
        rarities,
        type,
        types,
        name,
        drawer,
        cart,
        action: {
            clearSet,
            clearRarity,
            clearType,
            addToCart,
            alreadyInCart,
            removeItem,
            addMore,
            setCurrentPage,
            setCart,
            setDrawer,
            setSet,
            setRarity,
            setType,
            handleNameChange
        }
    }
    return (
        <ItemContext.Provider value={contextStore}> {children} </ItemContext.Provider>
    )
}

export default ContextProvider