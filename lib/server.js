const express = require('express');
const expressWinston = require('express-winston');
const router = require('./routes').default;
const imageToBuffer = require('./middlewares/imageToBuffer').default;

exports.createServer = function createServer({ logger }) {
  const api = express();

  // Log incoming requests
  api.use(expressWinston.logger({ meta: true, winstonInstance: logger }));

  // Assign a logger to the request object
  api.use((req, _res, next) => {
    req.logger = logger;
    next();
  });

  // Add an error handling logger
  api.use(expressWinston.errorLogger({ winstonInstance: logger }));
  api.use(imageToBuffer);
  api.use(router);

  return api;
};
