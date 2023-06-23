const router = require('express').Router()

const { getProductById, getAllProduct } = require('../controller/product.controller')

router.get('/:id', getProductById)
router.get('/', getAllProduct)

module.exports = router