const Joi = require('joi');
const JoiHelper = require('../../util/joiHelper');

const categorySchema = {
    add: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            slug: Joi.string().required(),
            parentId: Joi.string()
        });

        JoiHelper.validate(schema, req.body, res, next);
    },
}
module.exports = categorySchema;