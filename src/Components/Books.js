import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import Button from '@mui/material/Button';
import Rentbook from './Rentbook';
const A = React.memo(() => {
    console.log('sss');
    return "usha";
});
function Books() {
    const [booksdata, setbooksdata] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [formdata, setformdata] = useState({ name: '', author: '', category: '' })
    const getusers = () => {
        const id = localStorage.getItem('ID')
        axios.get(`/api/EligibleBooks/${id}`)
            .then(response => {
                console.log(response.data)
                setbooksdata(response.data)
            })
    }
    useEffect(() => {
        getusers();
    }, [])



    const columns = [

        { headerName: "Book Name", field: 'title' },
        { headerName: "Author", field: 'author' },
        { headerName: "Publisher", field: 'publisher' },
        { headerName: "Category", field: 'category' },
        { headerName: "Language", field: 'language' },
        { headerName: "noOfCopies", field: 'noOfCopies' },
        {
            headerName: "Actions",
            cellRendererFramework: (params) => <div>
                <button variant='outlined' color='primary' onClick={() => handleRent(params.data)}>Rent</button>

            </div>
        }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const defaultColDef = {
        sortable: true, editable: true, filter: true, resizable: true
    }
    // const handleRent = (data) =>{
    //     console.log(data);
    //     setformdata(data);
    //     handleClickOpen()
    //  }
    const handleRent = (data) => {
        const confirm = window.confirm("Are you sure, you want to rent this book")
        if (confirm) {
            const id = localStorage.getItem('ID')
            axios.post(`/api/RequestRental/${data.id}/${id}`)
                .then(response => {
                    console.log(response.data)
                    // handleClose()
                })
        }
    }

    const handleFormSubmit = (e) => {
        console.log(e);

        axios.post('http://localhost:3000/rentrequests', e)
            .then(response => {
                console.log(response.data)
                handleClose()
            })
    }
    const handleClose = () => {
        setOpen(false);

    };
    const [count, setCount] = useState(0);
    return (
        <div>

            <div className="ag-theme-alpine" style={{ width: "59%", height: "250px" }}>
                <AgGridReact
                    rowData={booksdata}
                    columnDefs={columns}

                    defaultColDef={defaultColDef}
                />
            </div>

            {open && <Rentbook open={open} data={formdata} handleClose={handleClose} handleFormSubmit={handleFormSubmit} />}
            <div>hi</div>
            <A callback={() => { console.log(1) }} />
            <div onClick={() => setCount(o => o + 1)}>click me</div>
            <span>{count}</span>

        </div>

    )
}

export default Books