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

    const rows = groupItems(shelfItems, 3);

    return (
        <div className='col d-flex flex-column align-items-center' style={{backgroundColor: 'lightblue'}}>
            <p>This will be the Shelf component</p>
            {rows.map((row, rowIndex) => (
                <div className='row w-100' key={rowIndex}>
                    {row.map((item, itemIndex) => (
                        <div className='col-4' key={itemIndex}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
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
