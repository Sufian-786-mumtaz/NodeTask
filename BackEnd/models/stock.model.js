const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/mySqlConnection')
const Stock = sequelize.define('stock', {
    sku: DataTypes.STRING,
    stock_ids: DataTypes.STRING,
});

module.exports = Stock;