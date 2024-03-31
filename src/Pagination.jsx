import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Pagination = ({ currentPage, totalPages, onPage, rowsPerPage, onRowsPerPageChange }) => {

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPage(currentPage + 1);
        }
    };

    const handleRowsPerPageChange = (e) => {
        onRowsPerPageChange(parseInt(e.target.value));
    }

    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="page-link" onClick={handlePrevPage}>Previous</button>
                </li>
                <li className="page-item">
                    <span className="page-link">Page {currentPage} of {totalPages}</span>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={handleNextPage}>Next</button>
                </li>
                <li className="page-item" style={{ marginLeft: '10px' }}>
                    <select className="form-select" value={rowsPerPage} onChange={handleRowsPerPageChange} >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
};

export default Pagination;