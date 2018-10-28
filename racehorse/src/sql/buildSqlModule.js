const QueryFile = require("pg-promise").QueryFile
const LOGGER = require("../logger")

const enumSql = require("pg-promise").utils.enumSql
const MIGRATION_LOGBOOK_TABLE = "__migrations__"

const load = (
  file,
  params = {
    migrationTable: MIGRATION_LOGBOOK_TABLE
  }
) => {
  const options = {
    params
  }
  const qf = new QueryFile(file, options)
  if (qf.error) {
    LOGGER.error(qf.error)
  }
  return qf
}

module.exports = params =>
  enumSql(__dirname, { recursive: true }, file => {
    // NOTE: 'file' contains the full path to the SQL file, as we use __dirname for enumeration.
    return load(file, params)
  })
