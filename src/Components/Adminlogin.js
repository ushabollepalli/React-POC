import React   from 'react';
// import { useNavigate } from 'react-router-dom';
import { useFormik} from 'formik';
import './Adminlogin.css';
import axios from 'axios';
import {SetAuthToken} from './SetAuthToken'
function Adminlogin({openAdmin}){
  // const navigate = useNavigate()

  const formik = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    onSubmit: values => {
      // const config = {
      //   headers:{
      //       // Access-Control-Allow-Origin:*,
      //       Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMYXJzIiwiZXhwIjoxNjU3NTA2OTQ1LCJpYXQiOjE2NTU3MDY5NDV9.bRylSa8P-SupqNBH7wA0XnPKMgmCw9e2inQByJAD9pY'
      //   }
      // };
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
      openAdmin();
       }
     })
     .catch(err => console.log(err));
 
      // openAdmin();
    }
  })
 
  // const [logininfo, setlogininfo] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(logininfo);
  //   openAdmin();
  // };

  // const Handlechange = (event) => {
  //   setlogininfo({ ...logininfo, [event.target.name]: event.target.value });

  // };

    return(
     
        <form className="adminform" onSubmit={formik.handleSubmit}>
        <label> User Name </label>
          <input type="text" name="username" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} required/>
          <label> Password </label>
          <input type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} required />
          <button  type="submit" >Submit</button>
          {/* <button onClick={()=>navigate('/adminpage')}>redirect</button> */}
         
        </form>
      
    )
}

export default Adminlogin