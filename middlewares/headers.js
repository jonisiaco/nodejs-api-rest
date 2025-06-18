
function setHeaders(req, res, next) {
    res.setHeader('Authorization', 'Bearer your_secret');
    next();
}

module.exports = setHeaders;