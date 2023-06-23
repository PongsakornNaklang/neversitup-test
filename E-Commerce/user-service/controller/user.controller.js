const { Users } = require('../service/database')
const { getOrderByUserId } = require('../service/order.service')

const getProfile = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(401).json({ 'massage': 'user id invalid.' }).end()
    }

    const user_db = Users()
    let user_info = await user_db.findOne({ where: { id } });
    if (!user_info) {
        res.sendStatus(500);
    } else {
        return res.status(200).json({ profile: user_info });
    }
}

const postProfile = async (req, res) => {
    if (!req.body) {
        return res.status(401).json({ 'massage': 'user data id invalid.' }).end()
    }

    const { id, firstname, lastname, email, address, phone } = req.body
    const user_db = Users()
    let user_info = await user_db.create({
        id: id,
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
        email: email
    })

    if (!user_info) {
        res.sendStatus(500);
    } else {
        return res.status(200).json({ profile: user_info });
    }
}

const getOrderHistory = async (req, res) => {
    const { user_id } = req.params
    if (!user_id) {
        return res.status(401).json({ 'massage': 'user id invalid.' }).end()
    }

    let order_list = await getOrderByUserId(user_id, req)
    if (!order_list) {
        res.sendStatus(500);
    } else {
        return res.status(200).json({ order_list: order_list, user_id: user_id });
    }
}

module.exports = { getProfile, postProfile, getOrderHistory }