const fs = require('fs');
const express = require('express');

const imageManipulator  = require('./controllers/imageManipulator').default;
const router = new express.Router();


router.get('/hello',(req, res) => {
  const name = req.query.name || "stranger";
  res.send({ message: `Hello ${name}!` });
});

router.get('/favicon.ico',(_req, res) => {
  fs.readFile('static/favicon.ico', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.contentType('image/png');
      res.send(data);
    }
  });
});

router.get('/magic-image', imageManipulator);
router.all('*', (req, res) => res.status(501).send())

exports['default'] = router;