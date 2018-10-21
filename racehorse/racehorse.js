const path = require('path')

const promise = require('bluebird')

const createMigrationRepository = require('./repositories/migrations')
const LOGGER = require('./logger')

const initOptions = {
  promiseLib: promise,
  extend(obj) {
    obj.migrations = createMigrationRepository(obj)
  }
}

const dbConfig = {
  host: 'localhost',
  port: 3434,
  database: 'pg',
  user: 'pg',
  password: 'pg'
}

const migrationConfig = {
  migrationsDir: path.resolve(__dirname, '../JavaScript/migrations'),
}

const diagnostics = require('./diagnostics')
diagnostics.init(initOptions)

const run = async () => {
  const pgp = require('pg-promise')(initOptions)
  const db = pgp(dbConfig)
  try {
    await db.migrations.create()
  } catch (err) {
    LOGGER.error(err)
  } finally {
    db.$pool.end()
  }
}

run()
