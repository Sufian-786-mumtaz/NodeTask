const httpStatus = require('http-status');
const catchAsync = require('../utils/cathAsync');
const { authService, userService, tokenService } = require('../services/index');
const { User } = require('../models/index');
const { response } = require("../config/response")

const register = catchAsync(async (req, res) => {
  try {
    const isEmail = await User.findOne({ where: { email: req.body.email } });
    if (isEmail === null) {
      const user = await userService.createUser(req.body);
      if (user) {
        const tokens = await tokenService.generateAuthTokens(user);
        response(res, { user, tokens }, 'User created successfully', httpStatus.CREATED)
      }
    } else {
      response(res, "", 'Email already taken', httpStatus.BAD_REQUEST)
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password, res);
  const tokens = await tokenService.generateAuthTokens(user);
  response(res, { user, tokens }, "User loged in successfully", 200)
});

const logout = catchAsync(async (req, res) => {
  const tokenDoc = await authService.logout(req.body.refreshToken); 
  await tokenDoc.destroy()
  response(res, "", "User loged out successfully", 200)
});


module.exports = {
  login, register, logout
};
