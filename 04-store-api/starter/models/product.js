const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name must be provided']
    },
    price:{
        type: Number,
        required: [true, 'Product price must be provided']
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 4.5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        } // to restrict the values of company field to these values only. If we try to save a product with a company value that is not 
        // in this list, it will throw an error with the message '{VALUE} is not supported' where {VALUE} will be 
        // replaced with the actual value that was provided.
    }   
})

module.exports = mongoose.model('Product', productSchema)