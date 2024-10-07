const response = (statusCode, message, data, res) => {
    res.status(statusCode).json({
        status: statusCode,
        data : data,
        message : message
    });
}


module.exports = response;