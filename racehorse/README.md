# Racehorse.js: Why go back if you can go forward?

Very simple, very lightweight and very stubborn migration tool for Postgres 

* Configurability close to zero
* Uses only plain SQL files
* Relies on pg-promise

## Installation

    $ npm install racehorse

## Command line usage

If installed globally (-g), you can run `racehorse`

If installed locally, you can run `./node_modules/.bin/racehorse`

```
Usage: racehorse [options] [command]

  Connection string can be given as environmental variable DATABASE_URL
  (e.g. DATABASE_URL=postgres://username:password@localhost:5432/database)

Options:

  -V, --version     output the version number
  -h, --help        output usage information
  -c, --connection  connection string

Commands:

  create <name>     create a new migration (requires connection)
  migrate [name]    migrate up to a give migration (requires connection)
  status            list migrations and their status
  help [cmd]        display help for [cmd]

```

## Programmatic usage

To migrate your database programmatically (let's say as part of application startup)

```javascript
const racehorse = require('racehorse')
const settings = { ... }
racehorse.migrate(settings|db|connectionString).then(result => console.log('Migrations done'));
```

