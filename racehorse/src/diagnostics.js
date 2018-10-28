const monitor = require('pg-monitor')
const LOGGER = require('./logger')

monitor.setTheme('matrix')

const $DEV = process.env.NODE_ENV === 'development'

monitor.setLog((msg, info) => {
  if (info.event === 'error') {
    LOGGER.error(`[DB_MIGRATE] [${info.event.toUpperCase()}] ${info.text}`)
  } else if ($DEV) {
    LOGGER.info(`[DB_MIGRATE] [${info.event.toUpperCase()}] ${info.text}`)
  }
  info.display = false
})

module.exports = {
  init(options) {
    monitor.attach(options)
  }
}
