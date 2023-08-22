const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/index');
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== "ACCESS") {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategyV1 = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategyV1,
};
