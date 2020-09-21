const express = require('express');
const authcontroller = require('../server/controllers/authcontroller.js');
const router = express.Router();

router.post('/', authcontroller.verify, authcontroller.save, (req, res) => {
  if (res.locals.exists) {
    res.status(422).json({ error: 'Email is in use' });
  }

  if (res.locals.user) {
    res.status(200).json(`We saved ${res.locals.user.email}`);
  }
});

module.exports = router;
