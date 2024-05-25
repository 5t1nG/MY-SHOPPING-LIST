import React from 'react';

function Basket({ children, removeFromBasket }) {
    const basketItems = React.Children.map(children, child =>
        React.cloneElement(child, {
            buttonText: "-",
            onButtonClick: () => removeFromBasket(child.props.id),
            requireQuantity: true,
        })
    );

    const rows = groupItems(basketItems, 3);

    return (
        <div className='col d-flex flex-column align-items-center' style={{ backgroundColor: 'lightpink' }}>
            <p>This will be the Basket component</p>
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

export default Basket;
