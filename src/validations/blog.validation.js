const Joi = require('joi');

exports.createBlogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
});
