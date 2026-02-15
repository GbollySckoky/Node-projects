// Creating Schema and Model for Task with mongoose
const mongoose = require('mongoose')
// Schema is a blueprint for the data that we want to store in the database. It's also a representation of the data collection in the database. 
// It defines the structure of the documents in the collection and also defines the data types of the fields in the documents. 
// It's also used to define the validation rules for the fields in the documents. It's also used to define the default values for the 
// fields in the documents. It's also used to define the indexes for the fields in the documents. It's also used to define the virtuals for 
// the fields in the documents. It's also used to define the methods for the documents in the collection. It's also used to define the statics 
// for the model. It's also used to define the middleware for the model. It's also used to define the plugins for the model. It's also used to 
// define the options for the model. It's also used to define the schema options for the schema. It's also used to define the model options for
// the model. It's also used to define the connection options for mongoose.connect() method.
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)