const jwt = require('jsonwebtoken')
const JWT_KEY = 'my_secret_key'

const VerifyToken = (req, res, next) => {
    const cookieHeader = req.headers['cookie']
    if (typeof cookieHeader !== 'undefined') {
        const token = cookieHeader.split('token=')[1]
        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded
            next()
        })
    } else {
        res.sendStatus(403)
    }
}



module.exports = { VerifyToken }