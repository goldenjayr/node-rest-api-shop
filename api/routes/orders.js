const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({
        message: 'I got the orders'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'ORders posted'
    })
})

router.get('/:orderId', (req, res, next) => {
    res.json({
        message: 'here is your order',
        id: req.params.orderId
    })
})

module.exports = router