const { DataTypes } = require('sequelize');
const sequelizeInstance = require('../core/orm');

const Type = sequelizeInstance.define('type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Type;