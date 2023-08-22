const express = require('express');
const authRoute = require('./auth.route');
const uploadFileRoute = require("./uploadFIle.route")
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/uploadFile',
    route: uploadFileRoute,
  },
//   {
//     path: '/attendance',
//     route: attendanceRoute,
//   },
];

defaultRoutes.forEach((route) => {  
  router.use(route.path, route.route);
});

module.exports = router;
