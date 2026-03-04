const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please provide a name'],
        minLength: 3,
        maxLength: 50
    },
     email:{
        type: String,
        require: [true, 'Please provide an email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'Please provide a password'],
        minLength: 6,
    },
})

// HASH PASSORD
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// process.env.JWT_SECRET u still need to look into the all keys generator
UserSchema.method.createJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFE_TIME
    })
}

// compare the passowrd
UserSchema.methods.comparePassword = async function (candidatePaassword){
    const isMatch = await bcrypt.compare(candidatePaassword, this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)