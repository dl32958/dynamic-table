import React, { useState } from 'react';
import './Sorting_style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Sorting = ({ columnSelected, onSort }) => {
    const [sortOrder, setSortOrder] = useState('');

    const handleSort = () => {
        let nextSortOrder = '';
        if (sortOrder === '') {
            nextSortOrder = 'ascending';
        } else if (sortOrder === 'ascending') {
            nextSortOrder = 'descending';
        } else if (sortOrder === 'descending') {
            nextSortOrder = '';
        };

        setSortOrder(nextSortOrder);
        onSort(columnSelected, nextSortOrder === 'ascending');

        const allColumns = document.querySelectorAll('th button');
        allColumns.forEach(column => {
            if (column.textContent !== columnSelected) {
                column.textContent = '▲▼';
            }
        });
    };

    const renderSortArrow = () => {
        if (sortOrder === 'ascending') {
            return '▲';
        }
        if (sortOrder === 'descending') {
            return '▼';
        }
        return '▲▼';
    };

    return (
        <button className='btn btn-outline-secondary btn-sm' onClick={handleSort}>
            {renderSortArrow()}
        </button>
    )
};

export default Sorting;