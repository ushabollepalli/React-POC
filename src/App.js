// import logo from './logo.svg';
import './App.css';
// import Adminlogin from './Components/Adminlogin';
// import {useState} from 'react'
//  import Customerlogin from './Components/Customerlogin';
import Adminpage from './Components/Adminpage';
import Customerpage from './Components/Customerpage';
import Mainpage from './Mainpage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Test from './Test';
import AllBooks from './Components/AllBooks';
import ViewCustomers from './Components/ViewCustomers';
import RentalRequests from './Components/RentalRequests';
import Books from './Components/Books';
import Rentedbooks from './Components/Rentedbooks';
import Requestshistory from './Components/Requestshistory';

function App() {
  // const [admin, setadmin] = useState(false);
  // const [customer, setcustomer] = useState(false);
  // const [adminpage,setadminpage] = useState(false);
  // const [customerpage,setcustomerpage] = useState(false)

  // const adminClick = () => {

  //   setadmin(true);
  //   setcustomer(false);
  //   setadminpage(false);
  //   setcustomerpage(false);
  // };
  // const customerClick = ()=>{
  //   setcustomer(true)
  //   setadmin(false)
  //   setadminpage(false) ;
  //   setcustomerpage(false);
  // }
  // const openAdmin = ()=> {
  //   console.log("accessable")
  //   setadminpage(true);
  //   setadmin(false);
  // }
  // const openCustomer = ()=>{
  //   console.log("accessable")
  //   setcustomerpage(true);
  //   setcustomer(false);
  // }
  return (
    <Router>
      {/* <div className="App"> */}
        {/* <Mainpage/> */}
        <Routes>
          <Route path='/' exact element={<Mainpage />} />
          <Route path='/adminpage' element={<Adminpage />}>
            <Route path=''  exact element={<AllBooks />} />
            <Route path='customers' element={<ViewCustomers />} />
            <Route path='rentalrequests' element={<RentalRequests />} />
          </Route>
          <Route path='/customerpage' element={<Customerpage />} >
            <Route path='' exact element={<Books />} />
            <Route path='rentedbooks' element={<Rentedbooks />} />
            <Route path='requestshistory' element={<Requestshistory />} />
          </Route>

        </Routes>
        {/* <Test/> */}
        {/* <h1>Library Management System</h1>
     <button onClick={adminClick}>ADMIN</button>
     <button  onClick={customerClick}>CUSTOMER</button> 
      {admin  && <Adminlogin openAdmin={openAdmin}/>}
    {customer && <Customerlogin openCustomer={openCustomer}/>} 
    {adminpage && <Adminpage/>}
    {customerpage && <Customerpage/>} */}

      {/* </div> */}
      <p className='footer'>Library Management System</p>
    </Router>
  );
}

export default App;
