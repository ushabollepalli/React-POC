import React, { useState } from 'react'
import '../Mainpage.css';
import {useFormik} from 'formik';
import './Customerlogin.css';
import axios from 'axios';
import {SetAuthToken} from './SetAuthToken'
// import axios from 'axios';
function Customerlogin({openCustomer}) {

  const loginformik = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    onSubmit: (values,{resetForm}) => {
      // console.log("form data",values);
      // openCustomer();
      // resetForm({values:''});
      console.log("form data",values);
      axios.post("/api/authenticate", values)
     .then(response => {
       const token  =  response.data;
       console.log(response.data);
       console.log(response);
       if(response.data === "invalid username/password"){
        window.confirm("invalid username/password");
       }
       else{
       localStorage.setItem("token", token);
       SetAuthToken(token);
       axios.get(`/api/getID/${values.username}/${values.password}`)
       .then(response=>{
            console.log(response.data);
            localStorage.setItem("ID",response.data);
       })
       openCustomer();
       }
     })
     .catch(err => console.log(err));

    }
  });


  const regformik = useFormik({
    initialValues:{
      username:"",
      password:"",
      phoneNumber:"",
      email:"",
      sex:"",
      hometown:"",
      dateOfBirth:""
    },
    onSubmit: (values) => {
      console.log("formdata", values);
      // resetForm({values:''});
      // openCustomer();
      const userdata={};
      userdata.username= values.username;
      userdata.password=values.password;
      axios.post("/api/account/add", values)
      .then(response => {
        axios.post("/api/authenticate", userdata)
        .then(response => {
          const token  =  response.data;
          console.log(response.data);
          console.log(response);
          if(response.data === "invalid username/password"){
           window.confirm("invalid username/password");
          }
          else{
          localStorage.setItem("token", token);
          SetAuthToken(token);
          axios.get(`/api/getID/${userdata.username}/${userdata.password}`)
          .then(response=>{
               console.log(response.data);
               localStorage.setItem("ID",response.data);
          })
          openCustomer();
          }
        })
        .catch(err => console.log(err));
      })
 
    }
  })

  const [login, setlogin] = useState(true);
  const [register, setregister] = useState(false);
  const LoginClick = () => {
    setlogin(true)
    setregister(false)
  }
  const RegisterClick = () => {
    setregister(true)
    setlogin(false)
  }
  const [logininfo, setlogininfo] = useState({
    username: "",
    password: "",
  });
  const [registerinfo,setregisterinfo] = useState({
    username:"",password:"",phoneNumber:"",email:"",sex:"",hometown:"",dateOfBirth:""

  })
  
  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(logininfo);
    // axios.post('https://jsonplaceholder.typicode.com/posts',logininfo)
    // .then(
    //     response =>{
    //         console.log(response)
    //     })
    //     .catch(

    //     )
    openCustomer();

  };
  const handleregSubmit = (event) =>{
    event.preventDefault();
    console.log(registerinfo);
    openCustomer();
  }

  const Handlechange = (event) => {
    setlogininfo({ ...logininfo, [event.target.name]: event.target.value });
  };
  const Handleregchange = (event) =>{
    setregisterinfo({...registerinfo,[event.target.name]:event.target.value});
  }
  return (
    <div className="Login">
      <button onClick={LoginClick} className={login? 'activebutton':'notactive'}>Login Form</button>
      <button onClick={RegisterClick} className={register? 'activebutton':'notactive'}>Register Form</button>
      
      {login && <div>
        <form  className='customerlogin' onSubmit={loginformik.handleSubmit}>
          <label> User Name </label>
          <input type="text" name="username" placeholder="Username" value={loginformik.values.username} onChange={loginformik.handleChange} required/>
          <label> Password </label>
          <input type="password" name="password" placeholder="Password" value={loginformik.values.password} onChange={loginformik.handleChange} required/>
          <button>Submit</button>
        </form>
      </div>
      }
      {register && <div>
        <form className='customerreg' onSubmit={regformik.handleSubmit}>
          <label>User Name</label>
          <input type="text" name="username" value={regformik.values.username} onChange={regformik.handleChange} required/>
          <label>Password</label>
          <input type="password" name="password" value={regformik.values.password} onChange={regformik.handleChange} required/>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={regformik.values.phoneNumber} onChange={regformik.handleChange}  required/>
          <label >Enter your email:</label>
          <input type="email" name="email" value={regformik.values.email} onChange={regformik.handleChange} required/>
          <label>Gender</label>
          <div>
          <input type="radio" name="sex" value="male" onChange={regformik.handleChange} required/> Male
          <input type="radio" name="sex" value="female"onChange={regformik.handleChange} required/> Female 
          </div>
          <label>Hometown</label>
          <input type="text" name="hometown" value={regformik.values.hometown} onChange={regformik.handleChange} required/>
          <label>DOB</label>
  <input type="date" name="dateOfBirth" value={regformik.values.dateOfBirth} onChange={regformik.handleChange} required></input>
  <button type="submit">Submit</button>

        </form>
      </div>}
    </div>
  )
}

export default Customerlogin