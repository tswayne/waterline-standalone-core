const { suite, test, beforeEach } = require('mocha')
const sinon = require('sinon')
const optsFixture = require('./support/opts')
const waterlineCore = require('../lib/core')
const { assert } = require('chai')

const sandbox = sinon.createSandbox()
suite('integration', function() {

  beforeEach(function() {
    sandbox.restore()
  })

  test('happy path - setup waterline and return ontology', async function() {
    const options = Object.assign({}, optsFixture, {
      modelDefaults: {
        datastore: 'default',
        primaryKey: 'id',
        attributes: {
          id: { type: 'number', autoMigrations: { autoIncrement: true } },
        }
      }
    })

    const ontology = await waterlineCore(options)
    assert.deepEqual(ontology, {})
  })

})