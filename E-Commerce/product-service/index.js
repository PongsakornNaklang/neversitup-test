const express = require('express');
const cookieParser = require('cookie-parser')
const productRouter = require('./router/product.router');
const { DatabaseConnect } = require('./service/database');

const ProductService = async (port) => {
    const app = express();
    const cors = require('cors')

    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use('/product', productRouter)
    await DatabaseConnect()

    app.listen(port, () => {
        console.log('(Product-service) is running on port: '+ port );
    });
}

module.exports = {
    ProductService
}