const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `${dbName}`,{
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
)
module.exports = db