import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import styles from '../styles/navbarExtras.css'
import {useNavigate} from "react-router-dom";

function BasicExample() {
    const navigate = useNavigate();

    const goToNewPage = (page) => {
        if (page === 'home') { navigate('/home'); }
        else if (page === 'prototype') {navigate('/prototype')}
        else if (page === 'configuration') {navigate('/configuration')}
        else if (page === 'standard') {navigate('/standard')}
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top" data-bs-theme='dark'>
            <Container>
                <Navbar.Brand className='on-small-left'>Shopping Express</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='on-small-right'/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => goToNewPage('home')} className='on-small-left'>Home</Nav.Link>
                        <Nav.Link onClick={() => goToNewPage('standard')} className='on-small-left'>Standard</Nav.Link>
                        <Nav.Link onClick={() => goToNewPage('prototype')} className='on-small-left'>Prototype</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;