const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require("../errors/index");


// auth middleware to protect the dashboard route, so only authenticated users can access it and 
// to also protect routyes in the future if we want to add more protected routes, we can just use this middleware
// we can access the user information from the req.user object, which is set by the auth middleware
const authenticationMiddleware = async (req, res, next) => {
    console.log('req.header',req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1]; // get the token from the header it takes the form of "Bearer token", so we split
    //  it and get the second part which is the token
    console.log('token:', token);
     /**
     * Validate the token and get the user information from it, if the token is valid, 
     * we will allow the user to access the dashboard route, otherwise we will throw an error
     */
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token using the secret key, if the token is valid, it will return the decoded payload which contains the user information (id and username in our case), if the token is not valid, it will throw an error
      console.log('decoded:', decoded);
      const {id, username} = decoded;
      req.user = {id, username}; // we can set the user information in the req.user object, so we can access it in the dashboard route
      console.log('req.user:', req.user);
      next(); // if the token is valid, we call the next() function to allow the user to access the dashboard route
    } catch (error) {
      throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware;