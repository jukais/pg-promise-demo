const buildSqlModule = require('../sql/buildSqlModule')

const createMigrationRepository = (db, params) => {
  const sqls = buildSqlModule(params)

  return {
    create: () => db.none(sqls.create)
  }
}

module.exports = createMigrationRepository
