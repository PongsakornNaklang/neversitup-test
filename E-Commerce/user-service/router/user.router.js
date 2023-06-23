const router = require('express').Router()

const { getProfile, postProfile, getOrderHistory } = require('../controller/user.controller')
const { VerifyToken } = require('../util/verify')

router.get('/profile', VerifyToken, getProfile)
router.post('/profile', postProfile)
router.get('/order-history/:user_id', VerifyToken, getOrderHistory)

module.exports = router