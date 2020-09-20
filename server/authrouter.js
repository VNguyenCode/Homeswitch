const express = require('express');
const authcontroller = require('../server/controllers/authcontroller.js');
const router = express.Router();

console.log(authcontroller)

router.post('/', (req, res) => {
  res.send(res.locals.url)
});

module.exports = router;
