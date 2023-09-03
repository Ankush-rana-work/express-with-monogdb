const CommonHelper = {
    sendError: (res, statusCode, message) => {
        res.status(statusCode).json({ message });
    },
    sendSucess: (res, statusCode, message, data) => {
        res.status(statusCode).json({
            message,
            data
        });
    }
}

module.exports = CommonHelper;