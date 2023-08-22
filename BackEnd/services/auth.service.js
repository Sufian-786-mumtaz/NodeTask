const httpStatus = require('http-status');
const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const { Token } = require("../models/index")
const { response } = require("../config/response")
const loginUserWithEmailAndPassword = async (email, password, res) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    response(res, "", "Incorrect email", httpStatus.UNAUTHORIZED)
  }
  const comparePassword = await user.comparePassword(password)
  if(comparePassword){
    return user;
  }else{
    response(res, "", "Incorrect password", httpStatus.UNAUTHORIZED)
  }
  
};
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({where:{ refreshToken: refreshToken, type: "AUTH", blacklisted: false }});
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token Not found');
    }
  return refreshTokenDoc
};
module.exports = {
  loginUserWithEmailAndPassword, logout
};
