const Waterline = require('./waterline-facade');
const fs = require('fs')
const readdir = require('util').promisify(fs.readdir)
const waterlineConfig = require('./waterline-config')
const schema = require('./schema')
const deepmerge = require('deepmerge')

module.exports =  async (opts) => {
  const waterline = new Waterline();

  const result = schema.validate(opts)
  if (result.error) {
    throw Error(`waterline config invalid: ${result.error}`)
  }
  const modelDefaults = opts.modelDefaults ? opts.modelDefaults : {}
  const config =  waterlineConfig(opts)
  const modelDir = opts.modelPath

  const files = await readdir(modelDir)
  const modelsNames = files.filter(file => !fs.statSync(`${modelDir}/${file}`).isDirectory())
  modelsNames.forEach(modelName => {
    const model = require(`${modelDir}/${modelName}`)
    const decoratedModel = deepmerge(modelDefaults, model)

    const wm = waterline.extend(decoratedModel)
    waterline.registerModel(wm)
  })

  const ontology = await waterline.initialize(config)
  return ontology.collections
}
