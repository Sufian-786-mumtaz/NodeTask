const express  = require("express")
require('dotenv').config()
const cors = require('cors');
const passport = require('passport');
const server = express()
const v1Routes = require("./routes/index")
const {sequelize} = require("./config/mySqlConnection")
const user = require("./models/user.model")
const token = require("./models/token.model")
const stock = require("./models/stock.model")
const ApiError = require('./utils/ApiError');
const httpStatus = require("http-status");
const jwtStrategyV1 = require("./config/passport")
const SqlConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully with mysql.');
    } catch (error) {
        console.error('Unable to connect to the mysql database:', error);
        return false;
    } 
    user.sync({ alter: { drop: false } }).then(()=>{
        console.log("yes re sync of users is done")
      }).catch((err)=>{
        console.log(err)
      })
    token.sync({ alter: { drop: false } }).then(()=>{
    console.log("yes re sync of tokens is done")
    }).catch((err)=>{
    console.log(err)
    })
    stock.sync({ alter: { drop: false } }).then(()=>{
      console.log("yes re sync of stock is done")
      }).catch((err)=>{
      console.log(err)
      })
    sequelize.sync({ alter: { drop: false } }).then(()=>{
        console.log("yes re sync is done")
      }).catch((err)=>{
        console.log(err)
      })
}
// parse json request body
server.use(express.json());

// parse urlencoded request body
server.use(express.urlencoded({ extended: true }));

// enable cors
server.use(cors());
server.options('*', cors());

// jwt authentication
server.use(passport.initialize());
passport.use('jwt', jwtStrategyV1);


server.use("/v1", v1Routes)

server.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

const PORT = process.env.PORT || 4000

server.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
    SqlConnection()
})


