const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  console.log("HKK",user)
  const token = user.createJWT() // createJWT() is grabbed from where
  console.log("user:",user)
  console.log(token)
//   const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }) // passimf the token
}


const login = async (req, res) => {
  const {email, password} = req.body

  if(!email || !password){
    throw new BadRequestError(" Please provide email and password")
  }

  // To verify the login or if the user exits
  const user = await User.findOne({email})
// if user is not authorized
  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")
  }
// Compare Password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // if user is verified
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user:{name: user.name}, token})
  res.send('Login coming soon!')
}

module.exports = {
  login,
  register
}