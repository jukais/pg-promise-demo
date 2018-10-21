const pgp = require("pg-promise")

const fs = require("fs")
const EOL = require("os").EOL

// generating an SQL tree from the folder:
const tree = pgp.utils.enumSql("./sql", { recursive: true })

// generating the module's code:
const code =
  "const load = require('./loadSql')" +
  EOL +
  EOL +
  "module.exports = " +
  pgp.utils.objectToCode(tree, value => {
    return "load(" + JSON.stringify(value) + ", params)"
  }) +
  ""
fs.writeFileSync('sql.js', code);
console.log(code)