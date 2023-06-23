const { Orders, ProductInOrder } = require('../service/database')
const { getProductById } = require('../service/product.service')

const createOrder = async (req, res) => {
    const { user_id, product_id_list } = req.body
    if (!user_id || !product_id_list) {
        return res.status(401).json({ 'massage': 'data id invalid.' }).end()
    }

    let total_amount = 0
    const products = await getProductById(product_id_list)

    if (products.length > 0) {
        total_amount = products.reduce((acc, cur) => acc + cur.price, 0)

        const order_db = Orders()
        let order_info = await order_db.create({
            user_id: user_id,
            total_amount: total_amount,
        })

        const prod_in_order_db = ProductInOrder()
        let payload = []
        for (const product of products) {
            payload.push({ product_id: product.id, order_id: order_info.id });
        }

        let prod_in_order_info = await prod_in_order_db.bulkCreate(payload)

        if (!order_info || !prod_in_order_info) {
            res.sendStatus(500);
        } else {
            return res.status(200).json({ "massage": "order success" });
        }
    } else {
        res.sendStatus(500);
    }
}

const cancelOrder = async (req, res) => {
    const { order_id } = req.body
    if (!order_id) {
        return res.status(401).json({ 'massage': 'order id invalid.' }).end()
    }

    const order_db = Orders()
    let order_info = await order_db.findByPk(order_id);
    if (!order_info) {
        res.sendStatus(500);
    } else {
        order_info.status = "cancelled"
        await order_info.save();
        return res.status(200).json({ 'massage': 'order is cancelled.' });
    }
}

const getOrderById = async (req, res) => {
    const order_id = req.params.order_id
    if (!order_id) {
        return res.status(401).json({ 'massage': 'order id invalid.' }).end()
    }

    const order_db = Orders()
    let order_info = await order_db.findOne({ where: { id: Number(order_id) } });

    const prod_in_order_db = ProductInOrder()
    let prod_info = await prod_in_order_db.findAll({ attributes: ['product_id'], where: { order_id: order_info.id } })
    const product_id_list = prod_info.map(prod => prod.product_id);

    const products = await getProductById(product_id_list)
    if (!order_info || !prod_info) {
        res.sendStatus(500);
    } else {
        return res.status(200).json({ order_info: { ...order_info.dataValues, products } });
    }
}

const getOrderByUserId = async (req, res) => {
    const { user_id } = req.params
    if (!user_id) {
        return res.status(401).json({ 'massage': 'user id invalid.' }).end()
    }

    const order_db = Orders()
    let order_info = await order_db.findAll({ where: { user_id } });
    const order_id_list = order_info.map((data) => data.dataValues["id"])
    const order_list = order_info.map((data) => data.dataValues)

    const prod_in_order_db = ProductInOrder()
    let prod_info = await prod_in_order_db.findAll({ attributes: ['product_id', 'order_id'], where: { order_id: order_id_list } })
    const product_id_list = prod_info.map(prod => prod.product_id);
    const prod_order_list = prod_info.map(prod => {
        return { order_id: prod.order_id, product_id: prod.product_id }
    });

    const products = await getProductById(product_id_list)

    const result = order_list.map(order => {
        const order_id = order.id;

        const productIds = prod_order_list
            .filter(po => po.order_id === order_id)
            .map(po => po.product_id);

        const productsInOrder = products.filter(p => productIds.includes(p.id));

        return {
            ...order,
            products: productsInOrder,
            total_amount: productsInOrder.reduce((total, p) => total + p.price, 0),
        };
    })

    if (!result) {
        res.sendStatus(500);
    } else {
        return res.status(200).json({ order_list: result });
    }
}

module.exports = { cancelOrder, createOrder, getOrderById, getOrderByUserId }