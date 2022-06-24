// import logo from './logo.svg';
import './App.css';
import Adminlogin from './Components/Adminlogin';
import {useState} from 'react'
 import Customerlogin from './Components/Customerlogin';
// import Adminpage from './Components/Adminpage';
// import Customerpage from './Components/Customerpage';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
function Mainpage() {
    const [page, setPage] = useState("customer");
//   const [admin, setadmin] = useState(false);
//   const [customer, setcustomer] = useState(false);
//   const [adminpage,setadminpage] = useState(false);
//   const [customerpage,setcustomerpage] = useState(false)
  const navigate = useNavigate()
  // let admin = true;
  // function greetUser(name) {
  //   admin=true;
  //   console.log(`Hi there, ${name},${admin}`); 
  //   // <Adminlogin/>
  // }
  const adminClick = () => {
    setPage("admin");
    // setadmin(true);
    // setcustomer(false);
    // setadminpage(false);
    // setcustomerpage(false);
  };
  const customerClick = ()=>{
      setPage("customer");
    // setcustomer(true)
    // setadmin(false)
    // setadminpage(false) ;
    // setcustomerpage(false);
  }
  const openAdmin = ()=> {
    
    console.log("accessable")
    // setadminpage(true);
    // setadmin(false);
    
    navigate('/adminpage')
  }
  const openCustomer = ()=>{
    console.log("accessable")
    // setcustomerpage(true);
    // setcustomer(false);
    navigate('/customerpage')
  }
  return (
    <div className="App">
      {/* <Adminpage/> */}
      {/* <Customerpage/> */}
     <h1 className='header'>Library Management System</h1>
     <button className={page === 'admin'? 'activebutton':'notactive'} onClick={adminClick}>ADMIN</button>
     <button  className={page === 'customer'? 'activebutton':'notactive'} onClick={customerClick}>CUSTOMER</button> 
     {/* <button onClick={()=>navigate('/adminpage')}>redirect</button> */}
      {page === "admin"  && <Adminlogin openAdmin={openAdmin}/>}
    { page === "customer" && <Customerlogin openCustomer={openCustomer}/>} 
    {/* {adminpage && <Adminpage/>}
    {customerpage && <Customerpage/>} */}
    
    </div>
  );
}

export default Mainpage;
