const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://user:g5nx5amqgq@cluster0-g3mr4.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(res => {
    console.log('Connected Successfully')
}).catch(error => {
    console.log(error)
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', '*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app