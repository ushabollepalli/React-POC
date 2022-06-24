import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import FormDialog from './FormDialog';
import Button from '@mui/material/Button';
import './AllBooks.css';


function AllBooks() {
   const base ='http://localhost:3000'
    const initialvalues = { title: "", publisher: "", author: "" ,language:"",noOfCopies:"",category:""}
    // const [gridapi, setgridapi] = useState(null)
    const [tabledata, settabledata] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [formdata, setformdata] = useState(initialvalues)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setformdata(initialvalues);
    };
    
    useEffect(() => {
        getusers()
    }, [])
    // const config = {
    //     headers:{
    //         // Access-Control-Allow-Origin:*,
    //         Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMYXJzIiwiZXhwIjoxNjU3NTA2OTQ1LCJpYXQiOjE2NTU3MDY5NDV9.bRylSa8P-SupqNBH7wA0XnPKMgmCw9e2inQByJAD9pY'
    //     }
    //   };
    //   const id=localStorage.getItem('ID')
    const getusers = () => {
        // axios.get(`/api/AllMyBooks/${id}`)
        // .then(response => {
        //     console.log(response.data)
        //     // setbooksdata(response.data)
        // })
        // axios.get('/api/getAllBooks',config)
        //     .then(response => {
        //         console.log(response.data)
        //         // settabledata(response.data)
        //     });
            // const data ={
            //     id:12,
            //     title :"Cup of coffee",  
            //     publisher:"Black Publishers",
            //     author:"Charan",
            //     language:"English",
            //     noOfCopies:"6"
            // }
            // axios.post('/api/book/addOrUpdate/Thriller',data)
            // .then(response => {
            //     console.log(response)
            //     // settabledata(response.data)
            // });

        // axios.get(`${base}/data`)
        //     .then(response => {
        //         console.log(response.data)
        //         settabledata(response.data)
        //     })

            axios.get("/api/getAllBooks")
            .then(response => {
                console.log(response.data)
                settabledata(response.data)
            })   
    }


    const columns = [
       
        { headerName: "Title", field: 'title' },
        {headerName:"Publisher",field:'publisher'},
        { headerName: "Author", field: 'author' },
        { headerName: "Category", field: 'category' },
        {headerName:"Language",field:'language'},
        {headerName:"noOfCopies",field:'noOfCopies'},
        {
            headerName: "Actions",cellRendererFramework: (params) => <div>
                <button  onClick={() => handleUpdate(params.data)}>Update</button>
                <button  onClick={() => handleDelete(params.data)}>Delete</button>
            </div>
        }
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true,resizable: true
    }
    const onChange = (e) => {
        //    console.log(e);
        e.preventDefault();
        const { value, name } = e.target
        setformdata({ ...formdata, [name]: value })
    }
    const onGridReady = (params) => {
        console.log(params);
        // setgridapi(params)
    }
    // const onCellClicked =(params) =>{
    //     console.log(params);
    //     console.log(params.value)
    // }
    const onCellValueChanged = (params) =>{
        console.log(params.data);

        // axios.put(`http://localhost:3000/data/${params.data.id}`, params.data)
        // .then(response => {
        //     console.log(response.data)
            
        // })
        const category = params.data.category;
        delete params.data.category;
        console.log(params.data);
        axios.put(`/api/book/update/${category}`, params.data)
        .then(response => {
            console.log(response.data)
            
        })
    }

    const handleDelete = (data) => {
        console.log(data.id);
        const confirm = window.confirm("Are you sure, you want to delete this book")
        if (confirm) {
            // axios.delete(`http://localhost:3000/data/${data.id}`)
            //     .then(response => {
            //         getusers()
            //     })
            axios.delete(`/api/book/delete/${data.id}`)
                .then(response => {
                    getusers()
                })
        }
    }
    const handleUpdate = (data) =>{
       console.log(data);
       setformdata(data)
       handleClickOpen()
    }

    const handleFormSubmit = (data) => {
        //  console.log(data)
        //  setformdata(initialvalues);
        //  handleClose()

        // console.log(formdata.id);
        // if(data.id){
        //     axios.put(`http://localhost:3000/data/${data.id}`, data)
        //     .then(response => {
        //         console.log(response.data)
        //         handleClose()
        //         getusers()
        //         setformdata(initialvalues) 
        //     })
        // }
        // else{
        
        // axios.post('http://localhost:3000/data', data)
        //     .then(response => {
        //         console.log(response.data)
        //         handleClose()
        //         getusers()
        //         setformdata(initialvalues)
        //     })
        // }

        if(data.id){
            console.log(data)
            const category=data.category;
            delete data.category;
            console.log(data)
            console.log(category)
                axios.put(`/api/book/update/${category}`, data)
                .then(response => {
                    console.log(response.data)
                    handleClose()
                    getusers()
                    setformdata(initialvalues) 
                })
            }
            else{
               console.log(data);
               const category=data.category;
            delete data.category;
            console.log(data)
            console.log(category)
                axios.post(`/api/book/add/${category}`, data)
                .then(response => {
                    console.log(response.data)
                    handleClose()
                    getusers()
                    setformdata(initialvalues)
                })
            }
    

    }
    return (
        <div>
            
                <button  className='addbook' onClick={handleClickOpen}>Add Book</button><br />
                <div className="ag-theme-alpine" style={{ width: '60%', height: '250px' }}>
                <AgGridReact
                    rowData={tabledata}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    
                    onCellValueChanged={onCellValueChanged}
                    onGridReady={onGridReady}
                />
            </div>
          { open && <FormDialog open={open} handleClose={handleClose} data={formdata} onChange={onChange} handleFormSubmit={handleFormSubmit} />}
        </div>
    )
}
export default AllBooks;