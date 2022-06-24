import React,{ useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
function RentalRequests(){

    const [rentalrequests, setrentalrequests] = useState(null);
    useEffect(() => {
        rentalrequest()
    }, [])
    const rentalrequest = () => {
        axios.get('/api/allPendingRequests/0')
            .then(response => {
                console.log(response.data)
                setrentalrequests(response.data) 
            })
    }
    const handleAccept = (data)=>{
        const confirm = window.confirm("Are you sure, you want to accept this book")
        if (confirm) {
        console.log(data);
        axios.put(`/api/approveRental/${data.bookId}/${data.customerId}`)
        .then(response => {
            rentalrequest()
        })
    }
    }
    const handleReject = (data)=>{
        const confirm = window.confirm("Are you sure, you want to reject this book")
        if (confirm) {
        console.log(data);
        axios.put(`/api/rejectRental/${data.bookId}/${data.customerId}`)
        .then(response => {
            rentalrequest()
        })
    }
    }
    const columns = [
       
        { headerName: "Customername", field: 'username' },
        { headerName: "Bookname", field: 'title' },
        { headerName: "Category", field: 'category' },
        { headerName: "Publisher", field: 'publisher' },
        { headerName: "Author", field: 'author' },
        { headerName: "RequestDate", field: 'requestDate' },
        // { headerName: "Requested Days", field: 'requesteddays' },
       
        {
            headerName: "Actions",cellRendererFramework: (params) => <div>
                <button  onClick={() => handleAccept(params.data)}>Accept</button>
                <button  onClick={() => handleReject(params.data)}>Reject</button>
            </div>
        }
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true,resizable: true
    }
        return(
            <div>
                <div className="ag-theme-alpine" style={{ width: "60%",height:'170px'}}> 
                <AgGridReact
                rowData={rentalrequests}
                columnDefs={columns}
               
                defaultColDef={defaultColDef}
                />
                    </div>
            </div>
        )
    
}
 export default RentalRequests;