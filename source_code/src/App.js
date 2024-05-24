import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, {useState} from 'react';
import './styles/App.css';
import Item from './components/Item';
import Shelf from './components/Shelf';
import Basket from './components/Basket';
import Search from './components/Search';

function App() {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (item) => {
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
        <div>
            <div className='row justify-content-center' style={{backgroundColor: 'peachpuff'}}>
                <div className='col align-items-center d-flex flex-column'>Reserved for Navigation Bar</div>
            </div>
            <div className='row justify-content-center' style={{backgroundColor: 'aquamarine'}}>
                <Search />
            </div>
            <div className='row' style={{backgroundColor: 'peachpuff'}}>
                <Shelf addToBasket={addToBasket}>
                    <Item id={0} itemName="Orange" quantity={1}/>
                    <Item id={1} itemName="Banana" quantity={1}/>
                    <Item id={2} itemName="Milk" quantity={1}/>
                </Shelf>
                <Basket removeFromBasket={removeFromBasket}>
                    {basketItems.map((item, index) =>
                        React.cloneElement(item, { key: index })
                    )}
                </Basket>
            </div>
        </div>
    );
}

export default App;
