const db = require('../db');

const authcontroller = {};

authcontroller.verify = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password

  

  //query to look through our records
  const query = 'SELECT * FROM users WHERE email = $1';
  // see if a user with the given email exists
  db.query(query, [email])
    .then((users) => {
      // if a user with email does exist return error
      if (users.rows.length !== 0) {
        console.log('I here');
        res.locals.exists = true;
        return next();
      } else {
        console.log('we here');
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

authcontroller.save = (req, res, next) => {
  if (res.locals.exists) return next();

  const email = req.body.email;
  const password = req.body.password;

  const query =
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  db.query(query, [email, password])
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
