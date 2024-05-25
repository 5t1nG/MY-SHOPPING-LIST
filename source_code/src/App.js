import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from 'react';
import './styles/App.css';
import Item from './components/Item';
import Shelf from './components/Shelf';
import Basket from './components/Basket';
import Search from './components/Search';
import MyNavbar from "./components/MyNavbar";
import AddItem from "./components/AddItem";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";

function App() {
    const initialShelfItems = [
        <Item id={0} itemName="Sweet Popcorn" quantity={1} price={1.90} amount={90} unit='g' image='https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG' />,
        <Item id={1} itemName="Banana" quantity={1} price={0.30} amount={120} unit='g' image='https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400' />,
        <Item id={2} itemName="Milk" quantity={1} price={1.20} amount={1000} unit='ml' image='https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg' />,
        <Item id={3} itemName="Yoghurt" quantity={1} price={1.39} amount={500} unit='g' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVZXpLGU-5tQl23oZH3ZLDfO4eEoucneuI-BjXTlI7Q&s' />,
        <Item id={4} itemName="Oreos" quantity={1} price={1.59} amount={154} unit='g' image='https://s41230.pcdn.co/wp-content/uploads/2019/03/are-oreos-vegan-6-1024x683.jpg' />,
        <Item id={5} itemName="Almonds" quantity={1} price={3.50} amount={200} unit='g' image='https://images.immediate.co.uk/production/volatile/sites/30/2021/02/almonds-9e25ce7.jpg?quality=90&resize=556,505' />,
        <Item id={6} itemName="Orange Juice" quantity={1} price={2.00} amount={1000} unit='ml' image='https://croots.co.uk/wp-content/uploads/2022/10/is-orange-juice-good-for-you-jpg.jpg' />,
        <Item id={7} itemName="Spaghetti" quantity={1} price={0.99} amount={500} unit='g' image='https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201808/Crack-Control-01_0.jpg?itok=yN-h8Jw6' />,
        <Item id={8} itemName="Chicken Breast" quantity={1} price={6.99} amount={500} unit='g' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaDgHCp1135rQ4xVIhGnJnybhUHXeqW7GB9muKdBSYg&s' />,
        <Item id={9} itemName="Green Tea" quantity={1} price={2.50} amount={30} unit='g' image='https://assets.rbl.ms/19152954/origin.jpg' />
    ];


    const [basketItems, setBasketItems] = useState([]);
    const [shelfItems, setShelfItems] = useState(initialShelfItems);
    const [shelfDisplayedItems, setShelfDisplayedItems] = useState(shelfItems);

    const totalPrice = () => {
        var total = 0;
        for (var i = 0; i < basketItems.length; i++) {
            total += (basketItems[i].props.price * basketItems[i].props.quantity)
        }
        return total.toFixed(2);
    };

    const updateShelf = (string) => {
        if (string.trim() === "") {
            setShelfDisplayedItems(shelfItems);
        } else {
            const filteredItems = shelfItems.filter(item =>
                item.props.itemName.toLowerCase().includes(string.toLowerCase())
            );
            setShelfDisplayedItems(filteredItems);
        }
    };

    const addToBasket = (item) => {
        if (!item) {
            return;
        }

        setBasketItems((prev) => {
            const itemIndex = prev.findIndex(basketItem => basketItem.props.id === item.props.id);
            if (itemIndex !== -1) {
                const updatedItems = [...prev];
                updatedItems[itemIndex] = React.cloneElement(prev[itemIndex], {
                    quantity: prev[itemIndex].props.quantity + 1,
                });
                return updatedItems;
            }
            return [...prev, item];
        });
    };

    const removeFromBasket = (id) => {
        setBasketItems((prev) => {
            const itemIndex = prev.findIndex(basketItem => basketItem.props.id === id);
            if (itemIndex !== -1) {
                const updatedItems = [...prev];
                if (prev[itemIndex].props.quantity - 1 === 0) {
                    return prev.filter(basketItem => basketItem.props.id !== id);
                } else {
                    updatedItems[itemIndex] = React.cloneElement(prev[itemIndex], {
                        quantity: prev[itemIndex].props.quantity - 1,
                    });
                    return updatedItems;
                }
            }
            return prev;
        });
    };

    return (
        <>
            <Row className='ustify-content-center'>
                <MyNavbar />
            </Row>
            <Row>
                <AddItem />
            </Row>
            <Row className='align-items-center'>
                <Col className='col-md-6' style={{padding: 0}}>
                    <Search updateShelf={updateShelf}/>
                </Col>
                <Col className='col-md-3' style={{height: '100%'}}>
                    <h4 style={{textAlign: 'center', margin: 0}}>Your Shopping Basket</h4>
                </Col>
                <Col className='col-md-3'>
                    <h5 style={{textAlign: 'center', margin: 0}}>Total Price: £{totalPrice()}</h5>
                </Col>
            </Row>
            <Row>
                <Shelf addToBasket={addToBasket}>
                    {shelfDisplayedItems}
                </Shelf>
                <Basket removeFromBasket={removeFromBasket}>
                    {basketItems.map((item, index) =>
                        React.cloneElement(item, { key: item.props.id })
                    )}
                </Basket>
            </Row>
        </>
    );
}

export default App;
