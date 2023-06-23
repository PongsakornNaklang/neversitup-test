const { AuthService } = require('./auth-service/index')
const { OrderService } = require('./order-service')
const { ProductService } = require('./product-service')
const { UserService } = require('./user-service')

AuthService(3000)
UserService(3001)
ProductService(3002)
OrderService(3003)

