//express
const express = require('express');
const app = express()
//cors
const cors = require('cors');
//path
const path = require('path')
//dotenv
require ('dotenv').config({path: path.resolve('.env')})

//port
const port = process.env.PORT || 8000

//routes
const root = require('./routes/root')
const expense = require('./routes/expense');
const autentication = require('./routes/autentication')
// const create = require('./routes/create')
// const search = require('./routes/search')

//server
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(root)
app.use('/api/autentication', autentication)
app.use('/api/v1', expense)

//-------------deployment----------------
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(process.cwd(), '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) => {
        res.send('backend is running...')
    })
}
//-------------deployment----------------

app.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1> <p>Page not found<p>`)
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}...`)
})