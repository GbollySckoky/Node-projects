const { CustomAPIError } = require('../errors/custom-error')
const errorMessageMiddleware = (err, req, res, next) => {
    console.error(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: 'Something went wrong, try again later'})
}

module.exports = errorMessageMiddleware