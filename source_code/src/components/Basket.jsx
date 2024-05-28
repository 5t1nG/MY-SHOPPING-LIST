import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Basket({ children, removeFromBasket }) {
    const basketItems = React.Children.map(children, child =>
        React.cloneElement(child, {
            buttonText: "-",
            onButtonClick: () => removeFromBasket(child.props.id),
            requireQuantity: true,
        })
    );

    const rows = groupItems(basketItems, 2);

    return (
        <Col className='d-flex flex-column align-items-center overflow-auto' style={{backgroundImage: 'linear-gradient(to bottom right, #ccc, #777)', height: '86vh'}}>
            {rows.map((row, rowIndex) => (
                <Row className='w-100' key={rowIndex} style={{marginTop: '1rem'}}>
                    {row.map((item, itemIndex) => (
                        <Col className='col-md-6' key={itemIndex}>
                            {item}
                        </Col>
                    ))}
                </Row>
            ))}
        </Col>
    );
}

const groupItems = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
};

export default Basket;
