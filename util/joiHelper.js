const { sendError } = require("../util/commonHelper");

const JoiHelper = {
  validate: (schema, inputs, res, next) => {
    const { error } = schema.validate(inputs);
    if (error) {
      error.statusCode = 422;
      next(error);
    } else {
      next();
    }
  }
}

module.exports = JoiHelper;