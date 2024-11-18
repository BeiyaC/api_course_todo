const sequelizeInstance = require('../core/orm');

const Type = require('./Type');
const Task = require('./Task')

Type.hasMany(Task)
Task.belongsTo(Type)

// sequelizeInstance.sync({alter: true})

module.exports = {
    Type,
    Task
}