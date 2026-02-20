require('dotenv').config()

// to populate the database with the products data from products.json file. migrating data from json file to database. 
// script to run this file is "npm run populate" in package.json file. this will run the start function in this file which will connect to
//  the database and then populate the database with the products data from products.json file. this is a one time script to populate the 
// database with the products data from products.json file. after running this script once, you can comment out the start function in this file\
//  and then run the server using "npm start" in package.json file.
// is this file to populate the database with the products data from products.json file. migrating data from json file to database
const connectDB = require('./db/connect') // to connect to the database
const Product = require('./models/product') // schema for products

const jsonProducts = require('./products.json') // products data in json format

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI) // connect to the database
        await Product.deleteMany() // to delete all products in the database before populating it with new data
        await Product.create(jsonProducts) // to create products in the database from the json file
        process.exit(0) // to exit the process after populating the database
        console.log('Connected to database...')
    }catch(err){
        console.log(err)
        process.exit(1) // to exit the process with error code 1 if there is an error
    }
}

start() // to start the connection to the database