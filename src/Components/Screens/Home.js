import React from 'react';
import Header from '../Header';
import Cards from '../Cards';
import Footer from '../Footer';

import { useState,useEffect } from 'react';






 function Home() {
const [foodcategarious,setfoodcategarious] = useState([])
const [fooditem,setfooditem] = useState([])
const [search,setsearch] = useState("")


 

const Data = async ()=>{
  let response = await fetch("http://localhost:5000/api/fooddata",{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    }
  })
  response = await response.json();
  //console.log(response[0],response[1])
  setfoodcategarious(response[1]);
  setfooditem(response[0]);
}
useEffect(()=>{
  Data()

},[])

  return (
    <>
   <Header/>
   <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id='Carousel'>
        <div className='carousel-caption' style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                
            </div>
        </div>
        <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
        </div>
        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300x300/?pastry" className="d-block w-100"style={{filter:"brightness(30%)"}} alt="..." />
        </div> 
        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
 <div className='container '>
  {
    foodcategarious !==[]?
    foodcategarious.map((Data)=>{
      return(
        <div className='row mb-3'>
        <div key={Data._id} className="fs-4 m-2">{Data.CategoryName}</div>
        <hr/>
        {fooditem !==[]? fooditem.filter((item)=>(item.CategoryName === Data.CategoryName) &&(item.name.toLowerCase().includes(search.toLowerCase())))
        .map(filteritems=>{
          return(
            <div key={filteritems._id} className="m-3 col-12 col-md-6 col-lg-3 ">
              <Cards 
              fooditem ={filteritems} 
                options ={filteritems.options[0]}
               
              >
                
              </Cards>
              
            </div>
          )
        })
        
        :<div> no such data found</div>}
        </div>
      )
    })
 :'' }
 </div>
 <Footer/>
    </>
  )
}
export default Home;
