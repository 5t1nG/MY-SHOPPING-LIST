import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import styles from '../styles/addItem.css';
import { FormGroup, FormLabel, Form, Row, Col } from 'react-bootstrap';

function AddItem(props) {
    const [show, setShow] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAmount, setProductAmount] = useState('');
    const [productUnit, setProductUnit] = useState('');
    const [productSource, setProductSource] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const advancedState = props.advancedState;

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productName === '' || productPrice === '' || productAmount === '' || productUnit === '' || (productLocation === '' && advancedState) || (productLocation.length !== 2 && advancedState)) {
            alert('Please review the details you have entered and try again 1 :)')
        } else {
            function testExpression(expression) {
                const regex = /^[A-Z][0-9]$/;
                return regex.test(expression);
            }

            if (testExpression(productLocation) && advancedState) {
                let source = productSource;
                if (productSource === '') {
                    source = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';
                }
                try {
                    props.addToShelf([productLocation[0], productLocation[1]], productName, 1, parseFloat(productPrice), parseFloat(productAmount), productUnit, source);
                    handleClose();
                } catch (error) {
                    alert('Please review the details you have entered and try again 2 :)')
                }
            } else if (!advancedState){
                let source = productSource;
                if (productSource === '') {
                    source = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';
                }
                props.addToShelf([null, null], productName, 1, parseFloat(productPrice), parseFloat(productAmount), productUnit, source);
                handleClose();
            } else {
                alert('Please review the details you have entered and try again 3 :)')
            }
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} id='addBar'>
                Missing a product?
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <FormGroup>
                                <FormLabel>Product Name</FormLabel>
                                <input className='form-control' placeholder='e.g Cabbage' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <small className='form-text text-muted'>Enter the name of the product above. Try to keep it short.</small>
                            </FormGroup>
                        </Row>
                        <FormGroup>
                            <Row className='mt-3'>
                                <Col>
                                    <FormLabel>Unit Price</FormLabel>
                                    <input className='form-control' placeholder='e.g 6.20' value={productPrice} type='number' onChange={(e) => setProductPrice(e.target.value)} />
                                    <small className='form-text text-muted'>Enter Price of a unit as a float.</small>
                                </Col>
                                <Col>
                                    <FormLabel>Amount</FormLabel>
                                    <input className='form-control' placeholder='e.g 100' value={productAmount} type='number' onChange={(e) => setProductAmount(e.target.value)} />
                                    <small className='form-text text-muted'>Enter weight or amount of a unit.</small>
                                </Col>
                                <Col>
                                    <FormLabel>Unit</FormLabel>
                                    <input className='form-control' placeholder='e.g ml' value={productUnit} onChange={(e) => setProductUnit(e.target.value)} />
                                    <small className='form-text text-muted'>Enter the unit of measure.</small>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Row className='mt-3'>
                            <FormGroup>
                                <FormLabel>Image Source</FormLabel>
                                <input className='form-control' placeholder='e.g https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg' value={productSource} onChange={(e) => setProductSource(e.target.value)} />
                                <small className='form-text text-muted'>Enter the product image's web address.</small>
                            </FormGroup>
                        </Row>
                        {advancedState &&
                            <Row className='mt-3'>
                                <FormGroup>
                                    <FormLabel>Location</FormLabel>
                                    <input className='form-control' placeholder='e.g C3' maxLength={2} value={productLocation} onChange={(e) => setProductLocation(e.target.value)} />
                                    <small className='form-text text-muted'>Item location via grid system [A-Z][0-9]</small>
                                </FormGroup>
                            </Row>
                        }
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Add Product
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddItem;
