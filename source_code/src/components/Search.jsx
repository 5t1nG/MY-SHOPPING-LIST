import React, {useState, useEffect} from "react";

function Search() {
    const searchBarMessage = 'Search for an item to add...';
    return (
        <div className='col-md-8'>
            <input style={{width: '100%'}} placeholder={searchBarMessage}/>
        </div>
    );
}

export default Search;