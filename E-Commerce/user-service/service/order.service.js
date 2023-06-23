const axios = require('axios');

const getOrderByUserId = async (user_id, req) => {
    let orders = []
    let res
    let cookie = req.headers['cookie']
    try {
        res = await axios.get('http://localhost:3003/order/user/' + user_id, { headers: { Cookie: cookie } })
        if (res) {
            orders = res.data.order_list
        }
        return orders
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = { getOrderByUserId }