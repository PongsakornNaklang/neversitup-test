const express = require('express');
const cookieParser = require('cookie-parser')
const orderRouter = require('./router/order.router');
const { DatabaseConnect } = require('./service/database');

const OrderService = async (port) => {
    const app = express();
    const cors = require('cors')

    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use('/order', orderRouter)
    await DatabaseConnect()

    app.listen(port, () => {
        console.log('(Order-service) is running on port: '+ port );
    });
}

module.exports = {
    OrderService
}