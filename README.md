[![npm](https://img.shields.io/npm/v/waterline-standalone-core.svg)](https://www.npmjs.com/package/waterline-standalone-core)

# Waterline Standalone Core
A [waterline](https://github.com/balderdashy/waterline) plugin for standalone usage.  This plugin replicates waterline usage in sails by:
* Allowing you to define waterline models exactly as in sails 
* Use any sails waterline adapter
* Returns model collection that you can attach to your favorite framework 

## Usage

```javascript
// Setup
const waterlineCore = require('waterline-standalone-core')

const options = {
 adapter: require('sails-mysql'),
 adapterType: 'mysql',
 database: {
   name: 'myDb',
   user: 'user',
   password: 'password',
   host: 'localhost'
 },
 modelPath: path.join(__dirname, './models'),
 modelDefaults: {
   datastore: 'default',
   fetchRecordsOnCreate: true,
   fetchRecordsOnUpdate: true,
   primaryKey: 'id',
   attributes: {
     createdAt: { type: 'string', autoCreatedAt: true, },
     updatedAt: { type: 'string', autoUpdatedAt: true, },
     id: { type: 'number', autoMigrations: { autoIncrement: true } },
   },
 }
}

const models = waterlineCore(options)

// Usage in handler
const pets = await models.pet.find()
```

#### Model definition
```javascript
// ./model/Pet.js
module.exports = {
  identity: 'pet',
  attributes: {
    name: { type: 'string' },  
  }
}
```

## Options

* adapter: Any of sail's [available adapters](https://next.sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters)
* adapterType: The name of adapter, example: 'mysql', 'sails-disk', etc
* database:
  * name: The database name
  * user: The database user
  * password: The database password (optional)
  * host: The database host
  * port: The database port (optional)
* modelPath: Path to the directory where your models are defined.
* modelDefaults: Object. Any [model settings](https://sailsjs.com/documentation/concepts/models-and-orm/model-settings) that will apply to all models.   
  * Great for setting default primaryKey, datastore, fetchRecordsOnUpdate, fetchRecordsOnCreate
  * Will be overridden by specific model settings

## Contributing
Pull requests or issues welcome!