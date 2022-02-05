//bcrypt
const bcrypt = require('bcrypt');
//actions from dataBase
const {
    findTheUser,
    createUser
} = require('../dataBase')

//controllers
const createNewUser = (req, res) => {
    const {password} = req.body,
        data = req.body; //when i hash the password, then i add it to that obj

    //hash the password
    bcrypt.hash(password, 10)
        .then(hash => {
            data.password = hash
            
            findTheUser(data, 'signin')
                .then(response => {
                    if (response.msg === 'user exists') return res.json({success: true, msg: 'user exists'})
        
                    createUser(data)
                        .then(response => res.json({success: true, msg: 'new user', id: response['_id'], username: data.username}))
                        .catch(err => console.log(err))
        
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

}

const findUser = (req, res) => {
    const {password} = req.body,
        data = req.body
    
    findTheUser(data, 'hash')
        .then(response => {
            if (response.situation === 'not verified') return res.json(response)

            data.password = response.hash
            findTheUser(data, 'login')
                .then(allData => {
                    bcrypt.compare(password, allData.hash)
                        .then(autentication => {
                            if(!autentication) return res.json({success: true, situation: 'not verified'})

                            res.json(allData)
                        })
                        .catch(err => console.log(err))
                })
        .catch(err => console.log(err))
        })
        .catch()

    
}

module.exports = {
    createNewUser, 
    findUser
}


