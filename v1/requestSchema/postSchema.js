const Joi = require('joi');
const JoiHelper = require('../../util/joiHelper');

const postSchema = {
    add: (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            slug: Joi.string().required(),
            category: Joi.string().required(),
            content: Joi.string().required(),
            author: Joi.string().required(),
        });

        JoiHelper.validate(schema, req.body, res, next);
    },
}
module.exports = postSchema;