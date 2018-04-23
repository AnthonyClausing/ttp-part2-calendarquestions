const Sequelize = require('sequelize')
const db = require('../db')
// This seemed like the best for events for a application of this scale.
const _Event = db.define('event', {
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    time: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
})



module.exports =  _Event