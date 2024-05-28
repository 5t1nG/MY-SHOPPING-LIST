import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Shelf({ children, addToBasket, advancedState }) {
    const handleAddToBasket = (id) => {
        const itemToAdd = React.Children.toArray(children).find(child => child.props.id === id);
        if (!itemToAdd) {
            return;
        }
        const clonedChild = React.cloneElement(itemToAdd, {
            buttonText: "Remove from Basket",
            onButtonClick: () => console.log("Item removed"),
            requireQuantity: true,
            advancedState: advancedState,
            callbackAddToBasket: handleAddToBasket
        });
        addToBasket(clonedChild);
    };

    const shelfItems = React.Children.map(children, (child) =>
        React.cloneElement(child, {
            buttonText: "Add to Basket",
            onButtonClick: () => handleAddToBasket(child.props.id),
            requireQuantity: false,
            advancedState: advancedState,
            callbackAddToBasket: handleAddToBasket
        })
    );

    const rows = groupItems(shelfItems, 2);

    return (
        <Col className='d-flex flex-column align-items-center overflow-auto' style={{ backgroundImage: 'linear-gradient(to right, #d55b3e, #ea9863)', height: '86vh' }}>
            {rows.map((row, rowIndex) => (
                <Row className='w-100' key={rowIndex} style={{marginTop: '1rem'}}>
                    {row.map((item, itemIndex) => (
                        <Col className='col-md-6 d-flex align-items-stretch' key={itemIndex}>
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

export default Shelf;
