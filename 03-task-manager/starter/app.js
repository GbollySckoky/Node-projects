const express = require('express')
const app = express()

// routes
app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

// app.get()
const port = 5000

app.listen(port, console.log('HHello world'))
