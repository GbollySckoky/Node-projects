const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth'); 


// we protect the dashboard route with the auth middleware, so only authenticated users can access it, and we can also protect other
// routes in the future by just using this middleware
router.route('/dashboard').get(authenticationMiddleware, dashboard); 
router.route('/login').post(login);


module.exports = router;