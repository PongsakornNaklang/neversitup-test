const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { UsersAccount } = require('../service/database')
const UserServices = require('../service/user.service')

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

const Register = async (req, res) => {
    const { username, password, firstname, lastname, email } = req.body
    if (!username || !password || !firstname || !lastname || !email) {
        return res.status(401).json({ 'massage': 'username or password invalid.' }).end()
    }

    const user_account_db = UsersAccount()
    const salt = await bcrypt.genSalt(10)
    let user_account_info = await user_account_db.create({
        username: username,
        password: await bcrypt.hash(password, salt),
    });

    const token = jwt.sign({ "id": user_account_info.id, "username": user_account_info.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });
    user_account_info.token = token
    user_account_info.save()

    let payload = {...req.body, id: user_account_info.id}
    let resPostProfile = await UserServices.postProfile(payload)
    if (!user_account_info || !resPostProfile) {
        res.sendStatus(500);
    } else {
        return res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 }).status(200).json({ massage: "register success" });
    }
}

const Login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).end()
    }

    const user_account_db = UsersAccount()
    const user = await user_account_db.findOne({ where: { username: username } });

    if (user) {
        const password_valid = await bcrypt.compare(password, user.password);
        if (password_valid) {
            const token = jwt.sign({ "id": user.id, "username": user.username }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });

            user.token = token
            await user.save()
            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
            res.end()
        } else {
            res.status(400).json({ error: "password incorrect" });
        }

    } else {
        res.status(404).json({ error: "invalid user" });
    }
}

const Logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.end()
}

module.exports = {
    Register, Login, Logout
}