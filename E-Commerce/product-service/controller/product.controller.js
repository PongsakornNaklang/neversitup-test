const { Products } = require('../service/database')

const getProductById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(401).json({ 'massage': 'product id invalid.' }).end()
    }

    const product_db = Products()
    let product_info = await product_db.findOne({ where: { id } });
    if (!product_info) {
        res.sendStatus(500)
    } else {
        return res.status(200).json({ product: product_info })
    }
}

const getAllProduct = async (req, res) => {
    const product_db = Products()
    let product_info = await product_db.findAll({ raw: true })
    if (!product_info) {
        res.sendStatus(500)
    } else {
        return res.status(200).json({ product: product_info })
    }
}


module.exports = { getProductById, getAllProduct }