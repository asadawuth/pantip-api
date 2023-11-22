const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  email: Joi.alternatives([
    Joi.string().email(),
    Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
  ]),
});

exports.registerSchema = registerSchema;
