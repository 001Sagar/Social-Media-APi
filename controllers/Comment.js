const homeController = require('../routes/auth');

const Comment = require('../models/comentschema');

module.exports.create = async function(req,res){
   try {
    const new_comment = await new Comment({
        name:req.body.name,
        comment:req.body.comment
    })
    const newcomment = await new_comment.save();
    return res.status(200).json(newcomment)
   } catch (error) {
      console.log(error);
      return res.status(500).json(error)
   }
}

module.exports.editcomment = async function(req,res){
   try {
    const comment = await Comment.findOne({
        name:req.body.name
    })
    if(!comment){
      return res.status(400).json('Comment is not found')
    }
    const newcomment = req.body.newcomment;
    const com = await Comment.findByIdAndUpdate(comment._id,{
        comment:newcomment
    })
    return res.status(200).json({
        message:"Update Successfully",
        com
    })
   } catch (error) {
      console.log(error);
      return res.status(500).json(error)
   }
}

module.exports.deletecomment = async function(req,res){
   try {
    const comment = await Comment.findOne({
        name:req.body.name
    })
    if(!comment){
        return res.status(400).json('Comment is not found');
    }
    const del = await Comment.findByIdAndDelete(comment._id,{
        id:comment._id
    })
    return res.status(200).json("Delete Successfully");
   } catch (error) {
    console.log(error);
     return res.status(500).json(error);
   }
}