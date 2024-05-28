import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import Item from '../components/Item';
import Shelf from '../components/Shelf';
import Basket from '../components/Basket';
import Search from '../components/Search';
import MyNavbar from "../components/MyNavbar";
import AddItem from "../components/AddItem";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormRange from "react-bootstrap/FormRange";

function Prototype(props) {
    const initialShelfItems = props.initialProducts
    const [basketItems, setBasketItems] = useState([]);
    const [shelfItems, setShelfItems] = useState(initialShelfItems);
    const [shelfDisplayedItems, setShelfDisplayedItems] = useState(shelfItems);
    const advancedState = props.advanced;
    const [currentLocation, setCurrentLocation] = useState(['A', 0]);
    const [letterSlider, setLetterSlider] = useState(0);
    const [numberSlider, setNumberSlider] = useState(0);

    useEffect(() => {
        setShelfDisplayedItems(shelfItems);
    }, [shelfItems]);

    useEffect(() => {
        const sortedItems = arrangeAll(basketItems, currentLocation);
        setBasketItems(sortedItems);
    }, [currentLocation]);

    const hashmap = new Map([
        ['A', 0], ['B', 1], ['C', 2], ['D', 3], ['E', 4], ['F', 5], ['G', 6],
        ['H', 7], ['I', 8], ['J', 9], ['K', 10], ['L', 11], ['M', 12], ['N', 13],
        ['O', 14], ['P', 15], ['Q', 16], ['R', 17], ['S', 18], ['T', 19],
        ['U', 20], ['V', 21], ['W', 22], ['X', 23], ['Y', 24], ['Z', 25],
        [0, 'A'], [1, 'B'], [2, 'C'], [3, 'D'], [4, 'E'], [5, 'F'], [6, 'G'],
        [7, 'H'], [8, 'I'], [9, 'J'], [10, 'K'], [11, 'L'], [12, 'M'], [13, 'N'],
        [14, 'O'], [15, 'P'], [16, 'Q'], [17, 'R'], [18, 'S'], [19, 'T'],
        [20, 'U'], [21, 'V'], [22, 'W'], [23, 'X'], [24, 'Y'], [25, 'Z']
    ]);

    const handleSliderLetterChange = (event) => {
        setLetterSlider(event.target.value);
        setCurrentLocation([hashmap.get(parseFloat(event.target.value)), numberSlider]);
    };

    const handleSliderNumberChange = (event) => {
        setNumberSlider(event.target.value);
        setCurrentLocation([hashmap.get(parseFloat(letterSlider)), event.target.value]);
    };

    const findDistance = (first, second) => {
        const firstX = hashmap.get(first[0]);
        const secondX = hashmap.get(second[0]);
        const firstY = first[1];
        const secondY = second[1];
        const distanceX = Math.abs(secondX - firstX);
        const distanceY = Math.abs(secondY - firstY);

        return Math.sqrt(distanceX ** 2 + distanceY ** 2);
    };

    const arrangeAll = (basketItems, currentLocation) => {
        const completeArray = [...basketItems];

        const selectionSort = (array, currentLocation) => {
            const iterations = array.length;
            for (let i = 0; i < iterations - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < iterations; j++) {
                    if (findDistance(array[j].props.location, currentLocation) < findDistance(array[minIndex].props.location, currentLocation)) {
                        minIndex = j;
                    }
                }
                if (minIndex !== i) {
                    const temp = array[i];
                    array[i] = array[minIndex];
                    array[minIndex] = temp;
                }
            }
            return array;
        };

        return selectionSort(completeArray, currentLocation);
    };

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
        setShelfItems(shelfItems.concat(<Item id={idCalculation} location={location} itemName={name} quantity={quantity} price={price} amount={amount} unit={unit} image={source} />,
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
                return arrangeAll(updatedItems, currentLocation);
            }
            return arrangeAll([...prev, item], currentLocation);
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
                            <Row>
                                <Col className='col-md-5'>
                                    <FormRange
                                        onChange={handleSliderLetterChange}
                                        min={0}
                                        max={25}
                                        value={letterSlider}
                                    />
                                </Col>
                                <Col className='col-md-5' s>
                                    <FormRange
                                        onChange={handleSliderNumberChange}
                                        min={0}
                                        max={9}
                                        value={numberSlider}
                                    />
                                </Col>
                                <Col className='col-md-2'>
                                    <h5>{currentLocation[0] + currentLocation[1]}</h5>
                                </Col>
                            </Row>
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

export default Prototype;
