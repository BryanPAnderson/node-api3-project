const express = require('express');
const { validatePost, validateUserId, validateUser, logger } = require('./middleware/middleware');
const usersRouter = require("./users/users-router");
const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(express.json())
server.use(usersRouter)
server.use(logger, validatePost, validateUserId);
server.use(validateUser)

server.use((err, req, res) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong, please try again later"
  })
})

module.exports = server;
