import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import '../styles/extras.css';
import Item from '../components/Item';
import Shelf from '../components/Shelf';
import Basket from '../components/Basket';
import Search from '../components/Search';
import MyNavbar from "../components/MyNavbar";
import AddItem from "../components/AddItem";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Standard(props) {
    const initialShelfItems = props.initialProducts
    const [basketItems, setBasketItems] = useState([]);
    const [shelfItems, setShelfItems] = useState(initialShelfItems);
    const [shelfDisplayedItems, setShelfDisplayedItems] = useState(shelfItems);
    const advancedState = props.advanced;

    useEffect(() => {
        setShelfDisplayedItems(shelfItems);
    }, [shelfItems]);

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

    const handleAddToShelf = (location, name, quantity, price, amount, unit, source) => {
        const idCalculation = shelfItems.length;
        setShelfItems(shelfItems.concat(<Item id={idCalculation} location={[null, null]} itemName={name} quantity={quantity} price={price} amount={amount} unit={unit} image={source} />,
        ));
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
            <Row className='justify-content-center'>
                <MyNavbar />
            </Row>
            <Row>
                <AddItem advancedState={advancedState} addToShelf={handleAddToShelf}/>
            </Row>
            <Row>
                <Col xs={12} lg={6}>
                    <Row className='equal-height align-items-center'>
                        <Search updateShelf={updateShelf} />
                    </Row>
                    <Row>
                        <Shelf addToBasket={addToBasket} advancedState={advancedState}>
                            {shelfDisplayedItems}
                        </Shelf>
                    </Row>
                </Col>
                <Col xs={12} lg={6}>
                    <Row className='equal-height align-items-center'>
                        <Col xs={12} lg={6} style={{ textAlign: 'center' }}>
                            <h5 style={{margin: 0}}>Your Shopping Basket</h5>
                        </Col>
                        <Col xs={12} lg={6} style={{ textAlign: 'center' }}>
                            <h5 style={{margin: 0}}>Total Price: £{totalPrice()}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Basket removeFromBasket={removeFromBasket}>
                            {basketItems.map((item, index) =>
                                React.cloneElement(item, { key: item.props.id })
                            )}
                        </Basket>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Standard;
