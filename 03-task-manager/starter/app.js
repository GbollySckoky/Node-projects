const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')

// middleware 
app.use(express.json())
app.use(express.static('./public')) // to serve static files in public folder
app.use(notFound) // to handle routes that do not exist
// routes
// app.get('/', (req, res) => {
//     res.send('HELLO WORLD')
// })

app.use('/api/v1/tasks', tasks)
// app.get()
const port = 5000

const starrt = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log('HHello world'))
    }catch(err){
        console.log(err)
    }
}

starrt()


