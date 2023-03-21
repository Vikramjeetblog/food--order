const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mogoURI="mongodb+srv://Vikramjeet21:Simran26@cluster0.2vdb59k.mongodb.net/Foodapp?retryWrites=true&w=majority"
const MongoDB= async()=>{
  await mongoose.connect(mogoURI,{useNewUrlParser: true, useUnifiedTopology: true},async(err,reult)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log("connection established succesfully")
      const Fatchdata =  await mongoose.connection.db.collection("Food_items")
      Fatchdata.find({}).toArray(function(error,data){
        if (error){
          console.log (error)
        }
        else{
         
          global.Food_items = data;
          
        
        }
      })
      const FoodCategories =mongoose.connection.db.collection("FoodCategories")
      FoodCategories.find({}).toArray(function(error,food){
        if(error){
          console.log(error)
        }
        else{
          global.FoodCategories=food;
        
        }
      })
      

      
    }
  })
}
    
module.exports=MongoDB;


 
   


