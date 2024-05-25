import React from 'react';

function Search({ updateShelf }) {
    const searchBarMessage = 'Search for an item to add...';

    const handleInputChange = (event) => {
        updateShelf(event.target.value);
    };

    return (
        <div className='col-md-8'>
            <input
                style={{width: '100%'}}
                onChange={handleInputChange}
                placeholder={searchBarMessage}
            />
        </div>
    );
}

export default Search;
