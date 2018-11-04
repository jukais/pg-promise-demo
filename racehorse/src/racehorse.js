const enumSql = require("pg-promise").utils.enumSql
const LOGGER = require("./logger")
const migrationLogBook = require("./repositories/migrations")
const parseConnectionString = require('pg-connection-string').parse;
const path = require("path")
const promise = require("bluebird")

// TODO build config from connection string or config-object depending which one is given by user
const dbConfig = parseConnectionString(process.env.DATABASE_URL)

const migrationConfig = {
  migrationsDir: path.resolve(__dirname, "../../JavaScript/migrations"),
  migrationContexts: process.env.MIGRATION_TARGETS
}

const initOptions = {
  promiseLib: promise,
  extend(obj) {
    obj.migrations = migrationLogBook(obj)
  }
}

const resolveMigrationTree = enumSql(
  migrationConfig.migrationsDir,
  { recursive: true },
  (file, name, path) => {
    return file //new pgp.QueryFile(file, { minify: true })
  }
)

const run = async () => {
  const diagnostics = require("./diagnostics")
  diagnostics.init(initOptions)

  const pgp = require("pg-promise")(initOptions)
  const db = pgp(dbConfig)
  try {
    // Create logbook if needed
    await db.migrations.createLogbook()
    // Resolve migrations
    const migrations = resolveMigrationTree
    // Accept only relevant context (only root context supported ATM)
    const applicableMigrations = Object.keys(migrations).filter(name => name.match(/^(v[0-9]{3,})/))
    // Sort migrations
    applicableMigrations.sort()

    LOGGER.debug(`Applicable migrations: ${applicableMigrations}`)

    // Get id, name and checksum of already applied migrations ordered by name from db

    // One by one:
    // - Compare checksum
    // - Try to catch drift by comparing two-way existence between migration vs. db to detect deleted or added migrations
    // - Detect delta between current db state and migrations (what is the latest applied to db and what migrations there are to be added)

  } catch (err) {
    LOGGER.error(err)
  } finally {
    db.$pool.end()
  }
}

run()
