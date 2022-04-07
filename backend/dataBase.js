//mongoose
const mongoose = require('mongoose');
//path
const path = require('path');
//dotenv
require('dotenv').config({path: path.resolve('.env')})

//connection
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log('Connected to database'))
    .catch(err => err)

//schemas
const transactionSchema = mongoose.Schema({
    category: String,
    description: String,
    price: Number,
    date: Date,
    unix: Number,
    idUser: String
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

//models
const Transaction = mongoose.model('Transaction', transactionSchema)
const Users = mongoose.model('User', userSchema)


//actions
const createUser = async ({email, password, username}) => {
    const newUser = new Users({
        username,
        email,
        password
    })

    await newUser.save()

    return newUser; 
    
}

const addTransaction = async ({category, description, price, id}) => {
    const unixToday = Date.now(),
        date = new Date(unixToday).toString()

    const newTransaction = new Transaction({
        category,
        description,
        price,
        date: date,
        unix: unixToday,
        idUser: id
    })

    await newTransaction.save()

    return newTransaction;
}

const findTransaction = async ({category, price, dateFrom, dateTo, type, id}) => {
    const fromUnix = dateFrom !== 'empty'? new Date(dateFrom).getTime() : new Date('2015-01-01').getTime(),
        toUnix = dateTo !== 'empty'? new Date(dateTo).getTime() : Date.now()
   
    if (type === 'latest'){
        const results = await Transaction.find({idUser: id, unix: {$gt: fromUnix, $lt: toUnix}})
            .limit(7)
            .select('-__v')
            .sort('-unix')
                
        return results
    }
    else if (category === 'empty' && price === '0'){
        const results = await Transaction.find({idUser: id, unix: {$gte: fromUnix, $lte: toUnix}})
            .select('-__v')
            .sort('-unix')
        
        return results
    }

    const results = await Transaction.find(
        {$and: [
            {$or: [{category},{price}]},
            {unix: {$gt: fromUnix, $lt: toUnix}},
            {idUser: id}
        ]}
    ).select('-__v').sort('-unix')  

    return results;
}

const findTheUser = async ({email, username, password}, type) => {
    if (type === 'signin'){
        const result = await Users.find({email})
    
        return result.length? {msg: 'user exists'} : {msg: 'not exists'} 
    }
    if (type === 'login'){
        const result = await Users.find({email, password})

        return result.length
            ? {success: true, situation: 'verified', username: result[0].username, hash: result[0].password, id: result[0]['_id']} 
            : {success: true, situation: 'not verified'} 
    }
    if (type === 'hash'){
        const result = await Users.find({email})
         
        return result.length? {success: true, situation: 'verified', hash: result[0].password} : {success: true, situation: 'not verified'} 
    }
        
}


module.exports = {
    addTransaction,
    findTransaction,
    createUser,
    findTheUser
}
