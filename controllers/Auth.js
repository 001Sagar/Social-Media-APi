const homecontroller = require('../routes/auth');

const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.register = async function(req,res){
    try {
    const salt = await bcrypt.genSalt(15);
    const hashpass = await bcrypt.hash(req.body.password,salt);
    const new_user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpass
    })
    const user = await new_user.save();
    console.log(user);
     return res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.login = async function(req,res){
   try {
   const user = await User.findOne({
    username:req.body.username
   })
   if(!user){
   return res.status(400).json('User is not found')
   }
   const validated = await bcrypt.compare(req.body.password,user.password);
   if(!validated){
    return res.status(400).json('Wrong Password')
   }
//    const{password , ...others} = user._docs;
   return res.status(200).json(user);
   } catch (error) {
    console.log('err:',error);
    return res.status(500).json(error);
   }
}

module.exports.update = async function(req,res){
    try {
        const user = await User.findOne({
            username:req.body.username
        })
    if(!user){
      return  res.status(400).json('User is not found');
    } 
    const validated = await bcrypt.compare(req.body.password,user.password)  
    if(!validated){
       return   res.status(400).json('Password is not found');
    } 
    const newpassword = req.body.newpassword;
    const salt = await bcrypt.genSalt(15);
    const hashpass = await bcrypt.hash(newpassword,salt)
    const updateuser = await User.findByIdAndUpdate(user._id,{
        password:hashpass
    })
      
    return res.status(200).json({
        message:"Update Successfully",
        updateuser
    })

    } catch (error) {
        console.log(error);
       return res.status(500).json(error);
    }
}

module.exports.delete = async function(req,res){
    try {
        const user = await User.findOne({
            username:req.body.username
        })
        if(!user){
          return  res.status(400).json('User is not found')
        }
        const validation = await bcrypt.compare(req.body.password,user.password);
        if(!validation){
            res.status(400).json('Wrong Password')
        }
        const del = await User.findByIdAndDelete(user._id,{
            id:user._id
        })
      return res.status(200).json('Delete Successfully')
        
    } catch (error) {
        console.log(error);
      return res.status(500).json(error);
    }
}