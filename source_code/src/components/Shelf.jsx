import React from 'react';

function Shelf({ children, addToBasket }) {
    const handleAddToBasket = (id) => {
        const itemToAdd = React.Children.toArray(children).find(child => child.props.id === id);
        const clonedChild = React.cloneElement(itemToAdd, {
            buttonText: "Remove from Basket",
            onButtonClick: () => console.log("Item removed"),
            requireQuantity: true,
        });
        addToBasket(clonedChild);
    };

    const shelfItems = React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
            id: index,
            buttonText: "Add to Basket",
            onButtonClick: () => handleAddToBasket(index),
            requireQuantity: false,
        })
    );

    return (
        <div className='col d-flex flex-column align-items-center' style={{backgroundColor: 'lightblue'}}>
            <p>This will be the Shelf component</p>
            <div>
                {shelfItems}
            </div>
        </div>
    );
}

export default Shelf;
