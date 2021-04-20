const express = require('express');
const { validatePost, ValidateUserId, validateUser, validateUserId } = require("../middleware/middleware");

const router = express.Router();
const users = require("./users-model")

router.get('/', async (req, res, next) => {
  await users.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    console.log(error)
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser(), async (req, res, next) => {
  await users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validatePost(), validateUserId(), async (req, res, next) => {
  await users.update(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), async (req, res) => {
  await users.remove(req.params.id)
    .then((user) => {
      res.status(202).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id/posts', validateUserId(), async (req, res, next) => {
  await users.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.post('/:id/posts',validateUserId(), ValidateUser(), async (req, res, next) => {
  await users.insert(req.body)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

module.exports = router;
