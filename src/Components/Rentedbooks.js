import React , { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
const Iconadd = p =>{
    console.log(p.value);
    const time = new Date(p.value).getTime()-new Date();
    const days= Math.ceil(time / (1000 * 3600 * 24));
    if(days>2){
    return <div>{p.value}
    <FontAwesomeIcon   title={`you have to return this book before ${p.value}`} style={{color:"green"}}icon={faCircleInfo}/>
 </div>
    }
    else if(days<=2 && days > 0){
        return <div>{p.value}
        <FontAwesomeIcon   title="you have few days to return this book" style={{color:"yellow"}}icon={faTriangleExclamation}/>
     </div>
    }
    else{
        return <div>{p.value}
        <FontAwesomeIcon title="this book has to be returned deadline exceeded" style={{color:"red"}}icon={faCircleExclamation}/>
     </div>
    }

}
const Rentedbooks = () =>{
    const [rentedbooksdata, setrentedbooksdata] = useState(null);
    useEffect(() => {
        getrentedbooks()
    }, [])

    const getrentedbooks = () => {
        const id=localStorage.getItem('ID')
        axios.get(`/api/MyRentedBooks/${id}`)
            .then(response => {
                console.log(response.data)
                setrentedbooksdata(response.data)
            })
    } 
    const Rentbooksubmit = (data)=>{
      console.log(data);
      console.log(data.name);
      const confirm = window.confirm(`Are you sure, you want to return this book ${data.book}`)
        if (confirm) {
            const id=localStorage.getItem('ID')
      axios.put(`/api/ReturnBook/${data.id}/${id}`)
            .then(response => {
                console.log(response.data)
                getrentedbooks()
            })
            // axios.delete(`http://localhost:3000/rentedbooks/${data.id}`)
            //     .then(response => {
            //         getrentedbooks()
            //     })
                alert("Your book is successfully returned!!");
        }
    }
    const onGridReady = (params) => {
        console.log(params);
        // params.api.sizeColumnsToFit();
        // params.api.resetRowHeights();
    }
    const columns = [
       
        { headerName: "Name", field: 'book' },
        { headerName: "Author", field: 'author' },
        { headerName: "Category", field: 'category' },
        { headerName: "RequestDate", field: 'requestDate' },
        { headerName: "ApprovedDate", field: 'approveOrRejectDate', cellRenderer:Iconadd},
        {
            headerName: "Actions", cellRendererFramework: (params) => <div>
                <button variant='outlined' color='primary' onClick={() => Rentbooksubmit(params.data)}>Return</button>
                
            </div>
        }
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true,resizable: true
    }
    return(
        <div>
            <div className="ag-theme-alpine" style={{ width: "88%"}}> 
            <AgGridReact
            rowData={rentedbooksdata}
            columnDefs={columns}
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            />
                </div>
        </div>
    )
}
export default Rentedbooks;