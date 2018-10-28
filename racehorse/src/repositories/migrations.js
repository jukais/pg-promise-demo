const buildSqlModule = require('../sql/buildSqlModule')
const LOGGER = require('../logger')

const migrationLogBook = (db, params) => {
  const infraSqls = buildSqlModule(params)
  return {
    createLogbook: () => db.none(infraSqls.createLogbook),
    insertPendingMigration: () => db.none(infraSqls.insertPendingMigration),
    setMigrationSuccessful: () => db.none(infraSqls.setMigrationSuccessful),
    getMigrationById: () => db.none(infraSqls.getMigrationById)
  }
}

module.exports = migrationLogBook
