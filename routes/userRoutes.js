const express = require('express');

const {getAlluser,registerController,loginController} = require('../controllers/userController')

//router object
const router = express.Router();
////Routing refers to how an application's endpoints (URIs) respond to client requests

//GET ALL USER 
router.get('/all-user',getAlluser);

//CREATE USER || POST
router.post('/register',registerController);

//CREAte LOGIN || POST
router.post('/login',loginController);

module.exports = router;

