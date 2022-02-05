const express = require('express');
const router = express.Router()

//controllers
const {
    createNewUser, 
    findUser
} = require('../controllers/autentication');

//routes
router.route('/signin').post(createNewUser)
router.route('/login').post(findUser)


module.exports = router

