import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Searching = ({search, onSearch}) => {

    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className='input-group mb-3'>
            <span className='input-group-text'>Search ID</span>
            <input className='form-control' type="text" placeholder="Search ID..." value={search} onChange={handleInputChange}/>
        </div>
    )
};

export default Searching;