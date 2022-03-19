const Joi = require('joi');

const schema = Joi.object({
  adapter: Joi.any().required(),
  adapterType: Joi.string().required(),
  database: Joi.object().keys({
    name: Joi.string(),
    user: Joi.string(),
    password: Joi.string().optional().allow('').allow(null),
    host: Joi.string(),
    port: Joi.number().integer().optional().allow(null)
  }).required(),
  disk: Joi.object().keys({
    dir: Joi.string(),
    inMemoryOnly: Joi.boolean(),
  }),
  modelDefaults: Joi.object(),
  decoratorName: Joi.string().allow(null),
  modelPath: Joi.string()
})

module.exports.validate = (options) => {
  return schema.validate(options)
}
