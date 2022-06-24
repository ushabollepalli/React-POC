import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from '@mui/material'
import './FormDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark }  from '@fortawesome/free-solid-svg-icons'

import { useFormik} from 'formik';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
    const {id,title,publisher,author,language,noOfCopies,category} = data
   
    const formik = useFormik({
      initialValues:{
        id,
        title,
        publisher,
        author,
        language,
        noOfCopies,
        category
      },
      onSubmit: values => {
        console.log("form data",values);
        // openAdmin();
        handleFormSubmit(values)
      }
    })

  // return (
  //   <div>
     
  //     <Dialog
  //       open={open}
  //       onClose={handleClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //     >
  //       <DialogTitle id="alert-dialog-title">
  //        { id? "Update Book":"Adding New Book"}
  //       </DialogTitle>
  //       <DialogContent>
  //        <form>
  //             <TextField id="name" value={name}  onChange={e =>onChange(e)} placeholder="Enter name" label="Name" margin="dense" variant="outlined" fullWidth />
  //            <TextField id="author" value={author} onChange={e =>onChange(e)} placeholder="Enter author" label="author" margin="dense" variant="outlined" fullWidth/>
  //            <TextField id="category" value={category} onChange={e =>onChange(e)} placeholder="Enter category" label="category" margin="dense" variant="outlined" fullWidth/>
  //        </form>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose} color="secondary" variant="outlined">Cancle</Button>
  //         <Button  color="primary" variant="contained" onClick={()=>handleFormSubmit()}>
  //           {id?"Update":"Submit"}
  //         </Button>
  //       </DialogActions>
  //     </Dialog>

  //   </div>
  // );

  return  (
    <div className='bookpopup'>
         <FontAwesomeIcon className='bookclose' icon={faCircleXmark} onClick={handleClose}/>
        <h1 style={{color:"green", textAlign:"center",marginTop:"0px" }}> { id? "Update Book":"Adding New Book"}</h1>
        <form className='updateform' onSubmit={formik.handleSubmit}>
            <label> title : </label>
            <input type="text" value={formik.values.title} name="title" onChange={formik.handleChange} required/>
            <label> publisher : </label>
            <input type="text" name="publisher" value={formik.values.publisher} onChange={formik.handleChange} required/>
            <label> author : </label>
            <input type="text" name="author" value={formik.values.author} onChange={formik.handleChange} required/>
            <label> language : </label>
            <input type="text" name="language" value={formik.values.language} onChange={formik.handleChange} required/>
            <label> noOfCopies : </label>
            <input type="text" name="noOfCopies" value={formik.values.noOfCopies} onChange={formik.handleChange} required/>
            <label> category : </label>
            <input type="text" name="category" value={formik.values.category} onChange={formik.handleChange} required/>
           
            <div>
            <button className={id?"Update":"Submit"} >{id?"Update":"Submit"}</button>
            <button className='cancelbook' onClick={handleClose}>Cancel</button>
            </div>
        </form>

    </div>
)
}
