const users = require("../users/users-model")

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)

  next()
}

function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "User not found"
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving user"
      })
    })
  }

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing user name"
      })
    }
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "please provide text for post"
      })
    }
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}