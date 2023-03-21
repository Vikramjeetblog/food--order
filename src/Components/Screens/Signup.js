
import React from 'react'
import {Link}from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 function Signup() {
  const Navigate =useNavigate()
  const  [Details, setDetails] = useState({name:"",email:"",passward:"",location:""})
  const HandelSubmit= async(e)=>{
  e.preventDefault()
  const response = await fetch("http://localhost:5000/api/CreateUser",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({name:Details.name,email:Details.email,passward:Details.passward,location:Details.location})
  });
const json = await response.json()
console.log(json);
if(!json.success){
  alert("invalid Details")
}
Navigate('/Login')
}
const OnChange =(event)=>{
  setDetails({...Details,[event.target.name]:event.target.value})
}
  
  return (
   
    <>
     <section className="vh-100 gradient-custom">
     <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      <div className="card bg-white text-black" style={{borderRadius: "1rem"}}>
          <div className="card-body p-3 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
      
     <div className="container mt-3">
    <form onSubmit={HandelSubmit}>
    <div className="form-outline form-white mb-4">
    <label htmlFor="exampleInputPassword1">Name</label>
    <input type="text" className="form-control"  placeholder="Enter Your Name" name='name' value={Details.name} onChange={ OnChange}/>
  </div>
  <div className="form-outline form-white mb-4">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'value={Details.email} onChange={ OnChange}/>
  
  </div>
  <div className="form-outline form-white mb-4">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='passward'value={Details.passward} onChange={ OnChange} />
  </div>
  <div className="form-outline form-white mb-4">
    <label htmlFor="exampleInputPassword1">location</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" name='location'value={Details.location} onChange={ OnChange} />
  </div>
<div className='mt-4'>
<button className="btn btn-success btn-lg px-5 " type="submit">Signup</button>
</div>
<div className='mt-4'>
              <p className="mb-0 text-black ">Already have an account? <Link to="/Login" className="text-black-50 fw-bold">Login</Link>
              </p>
            </div>
  
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
    </>
  )

 }
export default Signup;
