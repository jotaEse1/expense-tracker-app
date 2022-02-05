//express
const express = require('express');
const router = express.Router()

//controllers
const {welcome} = require('../controllers/root')

router.route('/').get(welcome)

module.exports = router


