const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    const products = await Product.find(queryObject)
    res.status(200).json({success: true, data: products, nbHits: products.length})
     console.log(req.query)
}
const getAllProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    if(!product){
        return res.status(404).json({success: false, msg: 'Product not found'})
    }
    res.status(200).json({success: true, data: product})
}

module.exports = {
    getAllProducts,
    getAllProduct
}