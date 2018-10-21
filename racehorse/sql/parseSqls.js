const QueryFile = require('pg-promise').QueryFile
const path = require('path')
const LOGGER = require('../logger')

const sql = (
  file,
  params = {
    migrationTable: '__migrations__'
  }
) => {
  const fullPath = path.join(__dirname, file) // generating full path;

  const options = {
    params
  }

  const qf = new QueryFile(fullPath, options)

  if (qf.error) {
    LOGGER.error(qf.error)
  }

  return qf
}

module.exports = params => {
  return {
    create: sql('migrations/create.sql', params),
    add: sql('migrations/add.sql', params),
    update: sql('migrations/update.sql', params)
  }
}
