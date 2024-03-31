import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filtering = ({headerName, onFilter, isFirstColumn}) => {
    const [filter, setFilter] = useState('');
    
    const handleInputChange = (e) => {
        const input = e.target.value.trim();
        setFilter(input);

        onFilter({
            [headerName]: input
        })
    };

    if (isFirstColumn) {
        return (
            <input className='form-control' type="text" disabled/>
        )
    };
    return (
        // onChange -> Listen for input box change events
        // <input className='form-control' type="text" placeholder={`Filter ${headerName}`} value={filter} onChange={handleInputChange}/>
        <input className='form-control' type="text" placeholder={'Filter e.g. <0.5'} value={filter} onChange={handleInputChange}/>
    )
};

export default Filtering;