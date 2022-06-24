import React from "react";
import {  NavLink , Outlet, useNavigate} from "react-router-dom";
import './Customerpage.css';
const Customerpage = () =>{
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
                    <NavLink end to="/customerpage">Books</NavLink>
                </li>
                <li>
                    <NavLink to="/customerpage/rentedbooks">Rented Books</NavLink>
                </li>
                <li>
                    <NavLink to="/customerpage/requestshistory">Requests History</NavLink>
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
export default Customerpage