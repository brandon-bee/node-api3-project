const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./users/users-router');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(cors());
server.use(morgan('tiny'));
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;