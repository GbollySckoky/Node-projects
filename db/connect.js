const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://Gbolly:gbollysckoky99@nodelearning.vm74uhm.mongodb.net/?appName=03-TASK-MANAGER&retryWrites=true&w=majority'

mongoose.connect(connectionString).then(() => console.log('DB Connected!!!')).catch((err) => console.log(err))