import React, { useEffect,useState } from 'react';
import './Rentbook.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark }  from '@fortawesome/free-solid-svg-icons'
function Rentbook({ open, data, handleFormSubmit, handleClose }) {
  
    const { name, author, category } = data
    const [formdata,setformdata] = useState({ name: name, author: author, category:category,fromdate:'',todate:''})
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    // const [mindate,setmindate] = useState(today);
    const mindate = today;
    const [fromdate,setfromdate] = useState(today);
    const [maxdate,setmaxdate] = useState(null);

    useEffect(()=>{
        console.log('rr')
        getmaxdate(mindate);
        setformdata({ name: name, author: author, category:category,fromdate:fromdate,todate:''})
    },[])

    const getmaxdate =(value)=>{    
        let fromDate = new Date(value);
        let maxToDate = fromDate.setDate(fromDate.getDate() + 6);
    
       let maxdate=new Date(maxToDate);
       var dd = maxdate.getDate();
    var mm = maxdate.getMonth()+1;
    var yyyy = maxdate.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    maxdate = yyyy+'-'+mm+'-'+dd;
    setmaxdate(maxdate);
    }

    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        
        console.log(formdata);
        handleFormSubmit(formdata);
    };

  
    const Handlefromchange = (event) => {
        console.log(event.target.value)
        setfromdate(event.target.value);
        getmaxdate(event.target.value);
       
        
        setformdata({ ...formdata, [event.target.name]: event.target.value,todate:'' });
    };
    const Handletochange = (event) => {
        console.log(event.target.value)
        
        setformdata({ ...formdata, [event.target.name]: event.target.value });
    };

    return (
        <div className='popup'>
            {/* <p className='close'  onClick={handleClose}>X</p> */}
            {/* <FontAwesomeIcon  className='close' icon="fa-solid fa-xmark" /> */}
            <FontAwesomeIcon className='close' icon={faCircleXmark} onClick={handleClose}/>
            <h1 style={{color:"green", textAlign:"center",marginTop:"0px",marginBottom:"0px" }}>Book for Rent</h1>
            <form  className='rentform' onSubmit={handleSubmit}>
                <label> Name : </label>
                <input type="text" name="name" value={name} />
                <label> Author : </label>
                <input type="text" name="author" value={author} />
                <label> Category : </label>
                <input type="text" name="category" value={category} />
                <label>FROM</label>
                <input type="date" name="fromdate" value={fromdate}  min={mindate} onChange={Handlefromchange} required></input>
                <label>TO</label>
                <input type="date" name="todate" value={formdata.todate} min={fromdate}  max={maxdate} onChange={Handletochange} required></input>
                <div>
                <button className='rent'>RENT</button>
                <button className='cancel' onClick={handleClose}>Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default Rentbook;