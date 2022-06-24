import React from "react";
import {  NavLink ,Outlet} from "react-router-dom";
import './Customerpage.css';
import { useNavigate } from 'react-router-dom';
const Adminpage = () =>{
    const navigate = useNavigate()
    const isSignout = ()=>{
        const confirm = window.confirm("Are you sure, you want to LOG OUT")
        if (confirm) {
            navigate('/')
        }
    }

    return (
        <div>
        <div className="navbar" >
            <div >
                Library Management
            </div>
            <div className="navlinks">
                <li>
                    <NavLink end to="/adminpage">Books</NavLink>
                </li>
                <li>
                    <NavLink to="/adminpage/customers">Customers</NavLink>
                </li>
                <li>
                    <NavLink to="/adminpage/rentalrequests">Rental Requests</NavLink>
                </li>
               
            </div>
            
            <div className="user">
                <p>usha</p>
                <p  onClick={() => isSignout()}>signout</p>
            </div>
           
        </div>
        <Outlet/>
        </div>
        
    )
}
export default Adminpage