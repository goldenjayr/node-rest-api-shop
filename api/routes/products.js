const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: 'alright',
        id: id
    })
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'PATCH request handled'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'DELETE request handled'
    })
})
module.exports = router