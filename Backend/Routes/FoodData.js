const express = require("express")
const router = express.Router();

router.post("/fooddata",(req,res)=>{
    try {
       
    
        res.send([ global.Food_items,FoodCategories])

    } catch (error) {
        console.error(error.message)
        res.send("server error")
    }
})
module.exports = router;