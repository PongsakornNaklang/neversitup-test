const axios = require('axios');

const getProductById = async (product_id) => {
    let products = []
    let res
    try {
        if (product_id.length > 0) {
            for (const id of product_id) {
                res = await axios.get('http://localhost:3002/product/' + id)
                if (res) {
                    products.push(res.data.product)
                }
            }
        }

        return products
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = { getProductById }