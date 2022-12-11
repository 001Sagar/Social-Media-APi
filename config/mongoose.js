const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/SOCIAL');

const db = mongoose.connection;

db.on('errror',console.error.bind(console,'Error in connecting to MongoDB'));

db.once('open',function(err){
    if(err){
        console.log('Error in connecting to MongoDB');
    }
    console.log('Connected to MongoDB:: DataBase');
})
module.exports = db;

