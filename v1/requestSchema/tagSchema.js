const Joi = require('joi');
const JoiHelper = require('../../util/joiHelper');

const tagSchema = {
    add: (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            slug: Joi.string().required(),
        });

        JoiHelper.validate(schema, req.body, res, next);
    },
}
module.exports = tagSchema;