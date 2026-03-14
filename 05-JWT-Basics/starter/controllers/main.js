const {BadRequestError} = require("../errors/index");
require('dotenv').config();
const jwt = require('jsonwebtoken');
/***
 * check if username, password are provided, if not, throw an error
 * if they are provided, create a token and return it to the client
 * the token will be used to access the protected route (dashboard) 
 * the dashboard route will be protected with the auth middleware, so only authenticated users can access it
 * the auth middleware will check if the token is valid, if it is valid, it will allow the user to access the dashboard route, otherwise it will throw an error
 * in the dashboard route, we will return a message with the user's name and a secret message (lucky number) that only authenticated users can see
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      throw new BadRequestError('Please provide username and password');
    }
    const id = new Date().getTime(); // in a real application, you would get the user id from the database
    // try to keep payload small, better experience for user, and also don't include sensitive information in the payload
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, { expiresIn: '30d' });
    // in a real application, you would check the username and password against the database and create a token if they are valid
    res.status(200).json({ msg: 'User created', token });
  }

//  we will protect this route with the auth middleware, so only authenticated users can access it
// we can access the user information from the req.user object, which is set by the auth middleware
  const dashboard = async (req, res) => {
    console.log("req.user:", req.user.username);
   const luckyNumber = Math.floor(Math.random() * 100); // generate a random lucky number for demonstration purposes
      res.status(200).json({
      msg: `Hello, ${req.user.username}, welcome to the dashboard!`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })
  }

    module.exports = {
        login,
        dashboard
    }