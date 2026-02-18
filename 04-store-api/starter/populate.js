require('dotenv').config()

const connectDB = require('./db/connect') // to connect to the database
const Product = require('./models/product') // schema for products

const jsonProducts = require('./products.json') // products data in json format

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI) // connect to the database
        console.log('Connected to database...')
    }catch(err){
        console.log(err)
    }
}

start() // to start the connection to the database