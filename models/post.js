const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    Topic:{
        type:String,
        required:true,
        unique:true
    },
    Tag:{
        type:String,
        required:true,
    },
     Content:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Post = mongoose.model('Post',PostSchema);
module.exports = Post;