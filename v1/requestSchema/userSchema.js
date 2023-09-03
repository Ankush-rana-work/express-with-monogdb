const Joi = require('joi');
const JoiHelper = require('../../util/joiHelper');

const userSchema = {
    register: (req, res, next) => {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            dob: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required().error(new Error('Date must be in the format yy-mm-dd')),
            role: Joi.string().valid('admin', 'user','author').required()
        });

        JoiHelper.validate(schema, req.body, res, next);
    },
    login: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6).max(20),
        });

        JoiHelper.validate(schema, req.body, res, next);
    },
    refreshToken: (req, res, next) => {
        const schema = Joi.object({
            refreshToken: Joi.string().required(),
        });

        JoiHelper.validate(schema, req.body, res, next);
    }
}
module.exports = userSchema;