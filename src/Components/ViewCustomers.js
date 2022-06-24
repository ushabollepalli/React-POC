import React,{ useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
function ViewCustomers(){

    const [customersdata, setcustomersdata] = useState(null);
    useEffect(() => {
        customerdata()
    }, [])
    const customerdata = () => {
        axios.get('/api/getAllCustomers')
            .then(response => {
                console.log(response.data)
                setcustomersdata(response.data) 
            })
            .catch(error =>{
                console.log(error);
            })
    }
    const columns = [
       
        { headerName: "Name", field: 'username' },
        { headerName: "joiningDate", field: 'joiningDate' },
        { headerName: "Gender", field: 'sex' },
        { headerName: "Hometown", field: 'hometown' },
        { headerName: "PhoneNumber", field: 'phoneNumber' },
        { headerName: "Email", field: 'email' }
        
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true,resizable: true
    }
        return(
            <div>
                <div className="ag-theme-alpine" style={{ width: "60%", height: "200px"}}> 
                <AgGridReact
                rowData={customersdata}
                columnDefs={columns}
                
                defaultColDef={defaultColDef}
                />
                    </div>
            </div>
        )
    
}
 export default ViewCustomers;