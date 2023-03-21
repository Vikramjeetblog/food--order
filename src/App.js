
import './App.css';

import React from 'react'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';

import Login from './Components/Screens/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Screens/Signup';
import Header from './Components/Header';
import Orders from './Components/Screens/Orders';
import Home from './Components/Screens/Home';
import { CartProvider } from './Components/Reducer';





 function App() {
  return (
  <CartProvider>
      <Router>
    <div>
  
    <Routes>
     <Route exact path ="/Login" element={<Login/>}/>
   <Route exact path='/Signup'element={<Signup/>}/>
<Route exact path='/Header'element={<Header/>}/>
<Route exact path ="/" element ={<Home/>}/>
<Route exact path ="/MyOrders" element ={<Orders/>}/>

    </Routes>
    </div>
   
   </Router>
   </CartProvider>
  

  
   
   
 
  
   
  
   
  )
}
export default App;
