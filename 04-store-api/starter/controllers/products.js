const getAllProducts = async (req, res) => {
    throw new Error('Testing error handler')
    res.status(200).json({msg: 'All products'})
}
const getAllProduct = async (req, res) => {
    res.status(200).json({msg: 'All products static'})
}

module.exports = {
    getAllProducts,
    getAllProduct
}