import React, { useState } from 'react';
import './App.css';
import FetchData from './FetchData';
import Sorting from './Sorting';
import Pagination from './Pagination';
import Filtering from './Filtering';
import Searching from './Searching';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [jsonData, setJsonData] = useState([]);
  const [header, setHeader] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [searchID, setSearchID] = useState('');

  const handleDataConvert = (data) => {
    setJsonData(data)
    // get header names
    if (data.length > 0) {
      const headerNames = Object.keys(data[0]);
      setHeader(headerNames);
    }
  }

  const handleSort = (columnSelected, isAscending) => {
    setSortColumn(columnSelected);
    setIsAscending(isAscending);
    // sort() return -1/1/0 determines the order of the elements
    const sortedData = [...jsonData].sort((a, b) => {
      if (a[columnSelected] === 'NA' && b[columnSelected] === 'NA') {
        return 0;
      }
      if (a[columnSelected] === 'NA') {
        return isAscending ? 1 : -1;
      }
      if (b[columnSelected] === 'NA') {
        return isAscending ? -1 : 1;
      }
      
      if (a[columnSelected] < b[columnSelected]) {
        return isAscending ? -1 : 1;
      }
      if (a[columnSelected] > b[columnSelected]) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
    setJsonData(sortedData);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
  };

  const handleFilter = (inputFilter) => {
    setFilter(inputFilter);
  };

  const filteredData = () => {
    let filtered = [...jsonData];
    Object.entries(filter).forEach(([column, value]) => {
      filtered = filtered.filter(row => {
        if (value.startsWith('>')) {
          return parseFloat(row[column]) > parseFloat(value.slice(1));
        } else if (value.startsWith('<')) {
          return parseFloat(row[column]) < parseFloat(value.slice(1));
        } else if (value.startsWith('=')) {
          return parseFloat(row[column]) === parseFloat(value.slice(1));
        }
        return true;
      });
    });
    return filtered;
  };

  const handleSearch = (inputSearch) => {
    setSearchID(inputSearch);
  }

  const searchedData = searchID === '' ? filteredData() : filteredData().filter(row => row.ID.includes(searchID));

  const totalPages = Math.ceil(jsonData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dataToDisplay = searchedData.slice(startIndex, endIndex);

  return (
    <div className="app">
      <header className='header'>
        <h1 className='header_title' style={{marginBottom: '20px'}}>Dynamic Table</h1>
        <FetchData onDataConvert={handleDataConvert} />
      </header>

      <div>
        <Searching search={searchID} onSearch={handleSearch} />
      </div>

      <table className='table table-striped'>
        <thead className='table_header'>
          <tr className='table_header--row'>
            {header.map((headerName, index) => (
              <th className='table_header--unit' key={index}>
                <div className='table_header--content'>
                  <div className='table_header--title'>
                    {headerName}
                  </div>
                  <div className='table_header--sort'>
                    <Sorting columnSelected={headerName} onSort={handleSort} />
                  </div>
                </div>
                <div className='table_header--filter'>
                  <Filtering headerName={headerName} onFilter={handleFilter} isFirstColumn={index === 0} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {/* {console.log(jsonData)} */}
          {dataToDisplay.map((row, index) => (
            <tr key={index}>
              {header.map((headerName, index) => (
                <td key={index}>
                  {row[headerName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPage={handlePageChange} rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </footer>
    </div>


  )
}

export default App
