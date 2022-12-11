const User = require('../models/user.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports.createsesseion = async function(req,res){
    try {
      const user = await User.findOne({
        username:req.body.username
      }) 
      if(!user){
        return res.status(400).json('Wrong credential')
      }
      const validation = await bcrypt.compare(req.body.password,user.password);
      if(!validation){
        return res.status(400).json('Wrong Password')
      }
      return res.status(200).json({
        message:"Sign in Successfully",
        data:{
            token:jwt.sign(user.toJSON(),'secret',{expiresIn:'10000'})
        }
      })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}