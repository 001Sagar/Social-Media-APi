const express = require('express');
const { mongo, default: mongoose } = require('mongoose');
const app = express();
const port = 8000;

//Connecting to MongoDB
const db = require('./config/mongoose')

app.get('/',function(req,res){
    res.end('Yeah! Server is Start')
});

//Body Parser
app.use(express.urlencoded({extended:true}));
app.use(express.json())

// Install the Jwt
const passportjwt = require('./config/passport');

// Fetching routes Folder
const route = require('./routes/auth');

// API ROUTES
app.use('/api/auth',route);

app.listen(port,function(err){
    if(err){
        console.log('Error');
    }
    console.log('server is run on::',port);
})