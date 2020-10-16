const db = require('../db');
const bcrypt = require('bcrypt');

const authcontroller = {};

authcontroller.verify = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //Validation to ensure that we receive both an email and password
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }

  //query to look through our records
  const query = 'SELECT * FROM users WHERE email = $1';
  // see if a user with the given email exists
  db.query(query, [email])
    .then((users) => {
      // if a user with email does exist return error
      if (users.rows.length !== 0) {
        res.locals.exists = true;
        return next();
      } else {
        res.locals.exists = false;
        return next();
      }
    })
    .catch((error) =>
      next({
        log: 'Express error handler caught error in authcontroller.verify',
        status: 400,
        message: { err: error },
      })
    );
};

//BCrypt to save a password
authcontroller.bcrypt = (req, res, next) => {
  if (res.locals.exists) return next();
  const password = req.body.password;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      res.locals.hash = hash;
      return next();
    });
  });
};

authcontroller.save = (req, res, next) => {
  if (res.locals.exists) return next();

  const email = req.body.email;
  // const password = req.body.password;
  const hash = res.locals.hash;

  const query =
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  db.query(query, [email, hash])
    .then((users) => {
      res.locals.user = users.rows[0];
      return next();
    })
    .catch((error) =>
      next({
        log: 'Express error handler caught error in authcontroller.save',
        status: 400,
        message: { err: error },
      })
    );
};

module.exports = authcontroller;
