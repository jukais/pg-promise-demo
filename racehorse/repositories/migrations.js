const parseSqls = require('../sql/parseSqls')

const createMigrationRepository = (db, params) => {
  const sqls = parseSqls(params)

  return {
    create: () => db.none(sqls.create)
  }
}

module.exports = createMigrationRepository
