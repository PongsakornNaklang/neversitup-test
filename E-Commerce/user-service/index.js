const express = require('express');
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user.router');
const { DatabaseConnect } = require('./service/database');

const UserService = async (port) => {
    const app = express();
    const cors = require('cors')

    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use('/user', userRouter)
    await DatabaseConnect()

    app.listen(port, () => {
        console.log('(User-service) is running on port: '+ port);
    });
}

module.exports = {
    UserService
}
