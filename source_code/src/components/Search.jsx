import React from 'react';

function Search({ updateShelf }) {
    const searchBarMessage = 'Search for an item to add...';

    const handleInputChange = (event) => {
        updateShelf(event.target.value);
    };

    return (
            <input
                style={{width: '100%', textAlign: 'center'}}
                onChange={handleInputChange}
                placeholder={searchBarMessage}
                className='form-control search-input border-0 shadow-none'
            />
    );
}

export default Search;
