import React , { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import {}
const Iconadd = p =>{
    console.log(p);
    if(p.value === 'RETURNED'){
    return <div>{p.value}
    
       <FontAwesomeIcon  style={{color:"green"}}icon={faCircleCheck}/>
    </div>
    }
    else{
        return <div>{p.value}
        <FontAwesomeIcon  style={{color:"red"}}icon={faCircleXmark}/>
     </div>
    }
}
const Requestshistory = () =>{
    const [requestshistorydata, setrequestshistorydata] = useState(null);
    useEffect(() => {
        requestsdata()
    }, [])
    const requestsdata = () => {
        const id=localStorage.getItem('ID')
        axios.get(`/api/AllMyRequests/${id}`)
            .then(response => {
                console.log(response.data)
                setrequestshistorydata(response.data) 
            })
    }
    const columns = [
       
        { headerName: "Book Name", field: 'book' },
        { headerName: "Requested date", field: 'requestDate' },
        { headerName: "Status", field: 'rentalStatus' ,cellRenderer:Iconadd},
        { headerName: "Approved/Rejected Date", field: 'approveOrRejectDate' },
        { headerName: "noOfCopies", field: 'noOfCopies' },
        
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true,resizable: true
    }

    return(
        <div>
            <div className="ag-theme-alpine" style={{ width: "74%"}}> 
            <AgGridReact
            rowData={requestshistorydata}
            columnDefs={columns}
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            />
                </div>
        </div>
    )
}
export default Requestshistory;