const { CustomAPIError } = require('../errors/custom-error')
const errorMessageMiddleware = (err, req, res, next) => {
    console.error(err)
 // Handle JSON parsing errors
    // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    //     return res.status(400).json({ msg: 'Invalid JSON format' })
    // }
    
    // Handle custom errors
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    
    // Default 500 error
    return res.status(500).json({ msg: 'Something went wrong, try again later' })
}

module.exports = errorMessageMiddleware