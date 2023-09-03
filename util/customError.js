class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500; // Default to 500 if not provided
        this.name = this.constructor.name;
    }
}

module.exports = CustomError;