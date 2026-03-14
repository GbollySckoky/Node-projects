require('dotenv').config()
require('express-async-errors') // to handle errors in async functions without try catch block

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
// error handler
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')


// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Store API')
})
app.use('/api/v1/products', productsRouter) // to handle all routes that start with /api/v1/products and then pass it to products router
app.use(notFound)
// app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, 
            console.log(`Server is listening on port ${PORT}...`))
    }catch(err){
        console.log(err)
    }
}


start()