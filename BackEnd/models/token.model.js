const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/mySqlConnection')
const Token = sequelize.define('tokens', {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user: {
          type: DataTypes.INTEGER,
          references:{
            model:"users",
            key:"id"
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("AUTH", "REFRESH", "ACCESS"),
          allowNull: false,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        blacklisted: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        timestamps: true,
      }
);

module.exports = Token;
