//express
const express = require('express');
const router = express.Router()

//controllers
const {
    createTransaction,
    searchTransaction
} = require('../controllers/expense')

router.route('/create').post(createTransaction)
router.route('/search').get(searchTransaction)

module.exports = router