const { getById } = require('../users/users-model');

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const { method, url } = req;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: 'user not found'
      });
    }
  })
  .catch(next);
}

function validateUser(req, res, next) {
  let { name } = req.body;
  if (name && name.trim()) {
    name = name.trim();
    next();
  } else {
    next({
      status: 400,
      message: 'missing required name field'
    });
  }
}

function validatePost(req, res, next) {
  let { text } = req.body;
  if (text) {
    text = text.trim();
    next();
  } else {
    next({
      status: 400,
      message: 'missing required text field'
    });
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}