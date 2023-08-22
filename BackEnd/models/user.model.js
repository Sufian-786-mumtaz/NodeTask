const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/mySqlConnection')
const bcrypt = require('bcryptjs');
const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail:true,
      isLowercase:true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  phoneNumber:{
    type: DataTypes.STRING,
  },
  isSignedIn:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
},
);

User.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = User;

