import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, CardImg, CardTitle, Row, Col, Button, Image} from "react-bootstrap";
import styles from '../styles/cardImages.css';

function Item(props) {
    const [itemName, setItemName] = useState(props.itemName || 'Name Me');
    const [quantity, setQuantity] = useState(props.quantity || 0);
    const [price, setPrice] = useState(props.price || '£??');
    const [amount, setAmount] = useState(props.amount || 1);
    const [unit, setUnit] = useState(props.unit || 'unit');
    const [image, setImage] = useState(props.image || '')

    useEffect(() => {
        setItemName(props.itemName);
        setQuantity(props.quantity);
        setPrice(props.price);
        setAmount(props.amount);
        setUnit(props.unit);
        setImage(props.image);
    }, [props.itemName, props.quantity, props.price, props.amount, props.unit, props.image]);


    return (
        <Card style={{width: '100%'}}>
            <CardHeader>
                <CardTitle>{itemName}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        {props.requireQuantity && <h5>{quantity}</h5>}
                        <h6>{props.requireQuantity ? (`£${(price * quantity).toFixed(2)}`): `£${price.toFixed(2)}` }</h6>
                        <p style={{fontSize: '0.8rem'}}>{unitCalculation(amount, unit, price)}</p>
                        <Button onClick={props.onButtonClick} className='btn-primary'>{props.buttonText}</Button>
                    </Col>
                    <Col>
                        <div className='image-container'>
                            <Image src={image} />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

const unitCalculation = (argAmount, argUnit, argPrice) => {
    return '£' + (argPrice / (argAmount/100)).toFixed(2).toString() + ' /100' + argUnit;
};

export default Item;
