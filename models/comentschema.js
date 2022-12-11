const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    comment:{
        type:String,
        required:true,
        unique:true
    }
},{
    timeseries:true
})

const coment = mongoose.model('coment',CommentSchema);

module.exports = coment;