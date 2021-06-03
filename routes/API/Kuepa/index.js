const express = require('express');
const router = express.Router();

//CONTROLLERS
const AuthController = require('../../../controllers/AuthController');
const UserController = require('../../../controllers/UserController');
const ChatsController = require('../../../controllers/ChatsController');


//MIDDLEWARE
const auth = require('../../../protected/middlewares/authenticated');


//USER
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/getUserAuth' ,auth.authenticated, UserController.getUserAuth)
router.post('/storeMessage' ,auth.authenticated, ChatsController.storeMessage)
router.get('/getMessages' ,auth.authenticated, ChatsController.getMessages)


module.exports = router;
