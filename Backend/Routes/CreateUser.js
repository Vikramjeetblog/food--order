const express = require("express");
const router = express.Router();
const User = require("../Models/User")
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const jwtSercet ="whatisyourname";



//creating signup routes//

router.post('/CreateUser',

body('email').isEmail(),

//name should be at least 5 characters long//

body('name',"please enter valid name").isLength({ min: 5 }),
  // password must be at least 5 characters long//

  body('passward',"please enter valid passward").isLength({ min: 5 }),
  
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let Securepassward =  await bcrypt.hash(req.body.passward,salt)

      try {
        await User.create({
        name:req.body.name,
        passward:Securepassward,
        email:req.body.email,
        location: req.body.location
     })

     res.json({success:true});
        
    } catch (error) {
        console.log(error)
        res.json({success:false})
        
    }
    
    
})
// creating login routes//
router.post ("/LoginUser",
body('email').isEmail(),
  // password must be at least 5 characters long//

  body('passward',"please enter valid passward").isLength({ min: 5 }),
  
  async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  let email = req.body.email
  try {
     let Userdata =await User.findOne({email});
     if(!Userdata){
      return res.status(400).json({ errors: "try lognin with correct eamil" });
     }
     const comparepassward = await bcrypt.compare(req.body.passward ,Userdata.passward)
     if(!comparepassward ){
      return res.status(400).json({ errors: "try lognin with correct passward" });
     }
     const Data={
      User : Userdata.id
     } 
     const authToken = jwttoken.sign(Data,jwtSercet);
     return res.json({success:true,authToken:authToken });
     
  } catch (error) {
    console.log(error)
        res.json({success:false})
  }
})

module.exports = router;