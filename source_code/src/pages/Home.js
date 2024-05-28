import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import '../styles/App.css';
import MyNavbar from "../components/MyNavbar";
import Row from 'react-bootstrap/Row';

function Home() {
    return (
        <>
            <Row className='justify-content-center'>
                <MyNavbar />
            </Row>
        </>
    );
}

export default Home;
