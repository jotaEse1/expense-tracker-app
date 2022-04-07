//actions from database
const {
    addTransaction,
    findTransaction
} = require('../dataBase')

const createTransaction = (req, res) => {
    const data = req.body;

    addTransaction(data)
        .then((response) => res.json({success: true, status: 'created', msg: 'none', data: response}))
        .catch(() => res.json({success: false, status: 'error', msg: 'Price has to be a number'}))
}

const searchTransaction = (req, res) => {
    const data = req.query
    
    findTransaction(data)
        .then(response => res.json({success: true, data: response}))
        .catch(err => res.json({success: false, error: err}))

}

module.exports = {
    createTransaction,
    searchTransaction
}