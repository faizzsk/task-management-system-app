function loggingMiddleware(req, res, next) {
    console.log("--Middleware--loggingMiddleware");

    console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
    next();
}

module.exports = loggingMiddleware;
