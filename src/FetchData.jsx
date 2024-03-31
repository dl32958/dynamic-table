import React, {useState} from 'react';
import * as XLSX from "xlsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function FetchData({ onDataConvert}) {
    const [file, setFile] = useState(null);

    const convertToJSON = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                console.log(json);
                // extract header row
                const header = json[0];
                // remove header row
                json.shift();
                // reduce(callback, [initial val]): JSON data -> array
                const jsonData = json.reduce((accumulator, row) => {
                    const obj = {};
                    header.forEach((col, index) => {
                        if (row[index] !== undefined) {
                            obj[col] = row[index];
                        }
                    });
                    if (Object.keys(obj).length > 0) {
                        accumulator.push(obj);
                    }
                    return accumulator;
                }, []);

                onDataConvert(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };

    return (
        <div className='input-group' style={{ marginBottom: '40px' }}>
            <input className='form-control' type="file" accept=".xls,.xlsx" onChange={(e) => setFile(e.target.files[0])}/>
            <button className='btn btn-outline-secondary' onClick={convertToJSON}>Open</button>
        </div>
    )
}

export default FetchData