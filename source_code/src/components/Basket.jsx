import React from 'react';

function Basket({children, removeFromBasket}) {
    const basketItems = React.Children.map(children, child =>
        React.cloneElement(child, {
            buttonText: "-",
            onButtonClick: () => removeFromBasket(child.props.id),
            requireQuantity: true,
        })
    );

    return (
        <div className='col d-flex flex-column align-items-center' style={{backgroundColor: 'lightpink'}}>
            <p>This will be the Basket component</p>
            <div>
                {basketItems}
            </div>
        </div>
    );
}

export default Basket;
