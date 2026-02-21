const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query 
    // whatever is coming from req.query is a string, 
    // so we need to convert it to the appropriate type if needed for example, 
    // if we want to filter by featured field which is a boolean, we need to convert the string to boolean
    // numericFilters is like a true or false filtering it checks of the greater number or amount of something for example, 
    // if we want to filter by price greater than 100, we can use numericFilters=price>100 in the query string
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

    if(numericFilters){
    const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte'
    }
    const regex = /\b(>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regex, (match) => `-${operatorMap[match]}-`)
    console.log(filters)
// we want to filter by price greater than 100, we can use numericFilters=price>
// 100 in the query string, so we need to replace the > operator with the $gt operator that is used in mongoose to filter by greater than,
//  and we also need to replace the = operator with the $eq operator that is used in mongoose to filter by equal to, and we also need to
//  replace the < operator with the $lt operator that is used in mongoose to filter by less than, and we also need to replace the >= operator 
// with the $gte operator that is used in mongoose to filter by greater than or equal to, and we also need to replace the <= operator with the 
// $lte operator that is used in mongoose to filter by less than or equal to, and we also need to replace the > operator with the $gt operator 
// that is used in mongoose to filter by greater than, and we also need to replace the >= operator with the $gte operator that is used in mongoose 
// to filter by greater than or equal to, and we also need to replace the = operator with the $eq operator that is used in mongoose to filter by
//  equal to, and we also need to replace the < operator with the $lt operator that is

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
        const [field, operator, value] = item.split('-')
        if(options.includes(field)){
            queryObject[field] = {[operator]: Number(value)}
        }       
    })
    }

    let result = Product.find(queryObject)

    if(sort){ // sort method in mongoose accepts a string of space separated values, so we need to replace the comma with space 
        console.log(sort)
        // we sort by multiple fields by separating them with a comma in the query string, 
        // for example: /api/v1/products?sort=price,-name will sort by price in ascending order and then by name in descending order
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt') // default sort by createdAt field
    }

    if(fields){ // select method in mongoose accepts a string of space separated values, so we need to replace the comma with space
        // it returns only the fields that we want to return in the response, 
        // it is used to limit the fields that we want to return in the response, 
        // it is also used to exclude some fields from the response by adding a - before the field name
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    } // select method in mongoose accepts a string of space separated values, so we need to replace the comma with space

    const page = Number(req.query.page) || 1  // page is a number for pagination
    const limit = Number(req.query.limit) || 10 // limit helps to control the list of datas that are to be displayed all at once
    const skip = (page - 1) * limit // the purpose of skip is to 

    result = result.skip(skip).limit(limit) // skip page

    const products = await result
    res.status(200).json({success: true, data: products, nbHits: products.length})
    console.log(queryObject)
     console.log(req.query)
}


const getAllProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).sort('createdAt')
    .select('name price company').limit(10)
    if(!product){
        return res.status(404).json({success: false, msg: 'Product not found'})
    }
    res.status(200).json({success: true, data: product})
}

module.exports = {
    getAllProducts,
    getAllProduct
}