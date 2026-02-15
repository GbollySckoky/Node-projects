const errorMessageMiddleware = (err, req, res, next) => {
    console.error(err)
    return res.status(err.status || 500).json({msg: err.message || 'Something went wrong, try again later'})
}

module.exports = errorMessageMiddleware