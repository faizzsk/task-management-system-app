function errorHandler(err, req, res, next) {
    console.log("--Middleware--Error Handler--");

    console.error(err.stack); 

    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message 
    });
}

module.exports = errorHandler;
