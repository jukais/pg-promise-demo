const load = require('./loadSql')

module.exports = {
    add: load("sql/add.sql", params),
    create: load("sql/create.sql", params),
    migrationSuccess: load("sql/migration_success.sql", params)
}