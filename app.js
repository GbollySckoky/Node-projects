const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

// middleware 
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

app.use('/api/v1/tasks', tasks)
// app.get()
const port = 5000

app.listen(port, console.log('HHello world'))
