const router = require('express').Router()

const { Login, Register, Logout } = require('../controller/auth.controller')

router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', Logout)

module.exports = router