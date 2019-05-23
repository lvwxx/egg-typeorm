'use strict'

const typeorm = require('./lib/index')

module.exports = app => {
  if (app.config.typeorm) typeorm(app)
}