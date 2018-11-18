const { suite, test, beforeEach } = require('mocha')
const { assert } = require('chai')

const sinon = require('sinon')
const optsFixture = require('./support/opts')
const Waterline = require('../lib/waterline-facade')
const waterlineCore = require('../lib/core')

const sandbox = sinon.createSandbox()
suite('core', function() {

  beforeEach(function() {
    sandbox.restore()
  })

  test('extends waterline collection with models located in configured directory ', async function() {
    const registerStub = sandbox.stub(Waterline.prototype, 'registerModel')
    await  waterlineCore(optsFixture)
    sinon.assert.calledTwice(registerStub)
  })

  test('applies configured model defaults to waterline collection', async function() {
    const defaults = {
      datastore: 'default',
      fetchRecordsOnCreate: true,
      primaryKey: 'id',
      attributes: {
        id: { type: 'number', autoMigrations: { autoIncrement: true } },
      }
    }

    sandbox.stub(Waterline.prototype, 'registerModel')
    const extendStub = sandbox.stub(Waterline.prototype, 'extend')
    await waterlineCore(Object.assign({}, optsFixture, { modelDefaults: defaults }))
    const registeredModel = extendStub.args[0][0]

    assert.equal(registeredModel.datastore, 'default')
    assert.equal(registeredModel.fetchRecordsOnCreate, true)
    assert.equal(registeredModel.primaryKey, 'id')
    assert.deepEqual(registeredModel.attributes.id, defaults.attributes.id)
  })

  test('initializes waterline with generated config', async function() {
    sandbox.stub(Waterline.prototype, 'registerModel')
    const initializeStub = sandbox.stub(Waterline.prototype, 'initialize').resolves({})
    await waterlineCore(optsFixture)

    sinon.assert.calledWith(initializeStub, {
      adapters: { mysql: {  } },
      datastores: {
        default: {
          adapter: "mysql",
          database: "myDb",
          host: "localhost",
          password: "password",
          port: 3306,
          user: "user",
          inMemoryOnly: undefined,
          dir: undefined
        }
      }
    })
  })

  test('returns ontology', async function() {
    sandbox.stub(Waterline.prototype, 'registerModel')
    const ontology = await waterlineCore(optsFixture)
    assert.deepEqual(ontology, {})
  })

})
