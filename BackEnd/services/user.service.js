const { User } = require('../models/index');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
    return User.create(userBody);
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({where:{ email:email }});
  return user
};

const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  deleteUserById,
};
