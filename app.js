const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
// const { createCustomError } = require('../errors/custom-errors')

// middleware 
app.use(express.json())
app.use(express.static('./public')) // to serve static files in public folder

// routes
app.use('/api/v1/tasks', tasks) // to handle all routes that start with /api/v1/tasks and then pass it to tasks router
app.use(notFound) // to handle routes that do not exist 404
// app.use(createCustomError) // to handle custom errors 5000
// app.get('/', (req, res) => {
//     res.send('HELLO WORLD')
// })

// app.get()
const port = 5000

const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log('HHello world'))
    }catch(err){
        console.log(err)
    }
}

start()


