const Joi = require('joi');

const schema = Joi.object().keys({
  adapter: Joi.any(),
  adapterType: Joi.string(),
  database: Joi.object().keys({
    name: Joi.string(),
    user: Joi.string(),
    password: Joi.string().optional().allow('').allow(null),
    host: Joi.string(),
    port: Joi.number().integer().optional().allow(null)
  }),
  disk: Joi.object().keys({
    dir: Joi.string(),
    inMemoryOnly: Joi.boolean(),
  }),
  modelDefaults: Joi.object(),
  decoratorName: Joi.string().allow(null),
  modelPath: Joi.string()
}).requiredKeys('adapter', 'adapterType', 'database')

module.exports.validate = (options) => {
  return Joi.validate(options, schema)
}
