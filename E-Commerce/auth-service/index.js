const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth.router');
const { DatabaseConnect } = require('./service/database');

const AuthService = async (port) => {
    const app = express();
    const cors = require('cors')

    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use('/auth', authRouter)
    await DatabaseConnect()

    app.listen(port, () => {
        console.log('(Auth-service) is running on port: '+ port);
    });
}

module.exports = {
    AuthService
}


