import React, { useState, useEffect } from 'react';

function Item(props) {
    const [itemName, setItemName] = useState(props.itemName || 'Name Me');
    const [quantity, setQuantity] = useState(props.quantity || 0);

    useEffect(() => {
        setItemName(props.itemName);
    }, [props.itemName]);

    useEffect(() => {
        setQuantity(props.quantity);
    }, [props.quantity]);

    return (
        <div className='card'>
            <h1>{itemName}</h1>
            {props.requireQuantity && <h2>{quantity}</h2>}
            <button onClick={props.onButtonClick}>{props.buttonText}</button>
        </div>
    );
}

export default Item;
