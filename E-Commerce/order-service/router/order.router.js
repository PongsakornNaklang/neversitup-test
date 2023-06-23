const router = require('express').Router()

const { createOrder, cancelOrder, getOrderById, getOrderByUserId } = require('../controller/order.controller')
const { VerifyToken } = require('../util/verify')

router.post('/create', VerifyToken, createOrder)
router.put('/cancel', VerifyToken, cancelOrder)
router.get('/view/:order_id', VerifyToken, getOrderById)

router.get('/user/:user_id', VerifyToken, getOrderByUserId)

module.exports = router