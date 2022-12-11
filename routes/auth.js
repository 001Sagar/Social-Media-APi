const express = require('express');

const router = express.Router();

const User = require('../controllers/Auth');
const Postrouter = require('../controllers/POST');

const pastoken = require('../controllers/userjwt');


// Requires Commests Controller
const comment = require('../controllers/Comment');

// ALL Users Routes Path
router.post('/register',User.register);
router.get('/login',User.login);
router.put('/update',User.update);
router.delete('/delete',User.delete)

// All posts Routes Path
router.post('/createpost',Postrouter.post);
router.put('/editpost',Postrouter.editpost);
router.delete('/deletepost',Postrouter.delete);

//All Comment Rouets
router.post('/createroute',comment.create);
router.put('/commetedit',comment.editcomment);
router.delete('/deletecomment',comment.deletecomment);

//Passport JWT Token
router.post('/createsession',pastoken.createsesseion);

module.exports = router;