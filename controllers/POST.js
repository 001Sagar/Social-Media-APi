const homecontroller = require('../routes/auth');

const Post = require('../models/post');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
module.exports.post = async function(req,res){
   try {
    const new_post = await new Post({
        Topic:req.body.Topic,
        Tag:req.body.Tag,
        Content:req.body.Content
    })
    const post = await new_post.save();
    console.log(post);
    return res.status(200).json(post);
   } catch (error) {
    console.log(error);
    return res.status(500).json(error);
   }
}

module.exports.editpost = async function(req,res){
    try {
        const post = await Post.findOne({
            Topic:req.body.Topic
        })
        if(!post){
            return res.status(400).json('Topic is not found');
        }
        const newTopic = req.body.newTopic;
        const newTag = req.body.newTag;
        const newContent = req.body.newContent;
        const updatepost = await Post.findByIdAndUpdate(post._id,{
            Topic:newTopic,
            Tag:newTag,
            Content:newContent
        })
        return res.status(200).json({
            message:"Update Successfully",
            updatepost
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.delete = async function(req,res){
  try {
    const post = await Post.findOne({
        Topic:req.body.Topic
    })
    if(!post){
        return res.status(400).json('post is not found');
    }
    const del = await Post.findByIdAndDelete(post._id,{
        id:post._id
    })
    return res.status(200).json('Delete Successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}