'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { createConnection, getRepository, getConnection } = require('typeorm')

module.exports = app => {
  app.addSingleton('typeorm', createTypeOrm)
}

let num = 0
let defaultDir = '/app/entities'

function existEntites(app) {
  const { baseDir } = app
  const entityDir = path.join(baseDir, defaultDir)
  return fs.existsSync(entityDir)
}

function join(baseDir, file) {
  return path.join(baseDir, defaultDir, file)
}

function getEntites(app, config) {
  const { baseDir } = app
  if (existEntites(app)) {
    const entityPath = join(baseDir, '/**.js')
    config.entities = [entityPath]
  }
  return config
}

function getModelName(file) {
  const fileName = path.basename(file, '.js')
  let name = ''
  fileName.split('_').forEach(i => {
    name += i.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  })
  return name
}

async function loadEntitesToCtx(app, connetConfig) {
  const { baseDir } = app
  defaultDir = connetConfig.baseDir ? `/app/${connetConfig.baseDir}` : defaultDir
  const entityDir = path.join(baseDir, defaultDir)
  if(!fs.existsSync(entityDir)) return
  const files = fs.readdirSync(entityDir)
  if (files.length) {
    app.context.repo = app.context.repo || {}
    for (let file of files) {
      if (path.extname(file) === '.js') {
        const name = getModelName(file)
        const entityPath = join(baseDir, file)
        const entity = require(entityPath)
        app.context.repo[name] = getRepository(entity, connetConfig.name)
      }
    }
  }
}

async function createTypeOrm(config, app) {
  
  assert(config.type && config.host && config.port && config.database && config.password !== undefined)

  if (config.baseDir) {
    defaultDir = `/app/${config.baseDir}`
  }

  const connetConfig = getEntites(app, config)

  const connection = await createConnection(connetConfig)
  
  await loadEntitesToCtx(app, connetConfig)

  const rows = await connection.manager.query('select now() as currentTime;')

  num ++

  app.logger.info(`[egg-typeorm] init instance ${num} success, rds currentTime: ${rows[0].currentTime}`);

  return connection
}