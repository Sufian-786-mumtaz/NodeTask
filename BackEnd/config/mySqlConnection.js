const { Sequelize } = require('sequelize');
exports.sequelize = new Sequelize('nodeTask', 'techteam', '123456', {
    host: '127.0.0.1',
    dialect: "mysql",
    timezone: '+00:00'
});


