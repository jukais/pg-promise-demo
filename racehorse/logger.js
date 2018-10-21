let LOGGER = console

module.exports = LOGGER
module.exports.setLogger = logger => {
  LOGGER = logger
}
