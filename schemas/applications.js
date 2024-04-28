const Joi = require("joi");
const {
  servicesList
} = require("../constants/application-constants");
const { PHONE_REGEXP } = require("../constants/regexp");

const addApplicationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": '"name" must be a string',
    "string.empty": '"name" is not allowed to be empty',
    "string.min": '"name" length must be at least {#limit} characters long',
    "string.max":
      '"name" length must be less than or equal to {#limit} characters long',
    "any.required": "missing required name field",
  }),

  phone: Joi.string().trim().required().regex(PHONE_REGEXP).messages({
    "string.base": '"phone" must be a string',
    "string.empty": '"phone" is not allowed to be empty',
    "any.required": '"phone" is required',
    "string.pattern.base": '"phone" must be a valid phone number',
  }),

  service: Joi.string().valid(...servicesList).required().messages({
    "string.base": '"Service type" must be a string',
    "string.empty": '"Service type" is not allowed to be empty',
    "any.required": '"Service type" is required',
    "any.only": `Service can only be of the following types: ${servicesList} `,
  }),
});

module.exports = {
  addApplicationSchema,
};
