// MONGOOSE HELPS TO CONNECT TO MONGO DB AND ALSO HELPS TO CREATE SCHEMAS AND MODELS
const mongoose = require('mongoose')

// .then(() => console.log('DB Connected!!!')).catch((err) => console.log(err))

const connectDb = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDb