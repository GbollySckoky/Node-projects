const express = require('express')
const router = express.Router()
const { getAllProducts, getAllProduct } = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProduct)

module.exports = router