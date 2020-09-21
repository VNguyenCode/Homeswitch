const { Pool } = require('pg');

const myURI =
  'postgres://ihgpdxnb:UyfLmMsaqgcjk0_XdfFeI9seGh5kWePV@lallah.db.elephantsql.com:5432/ihgpdxnb';

const pool = new Pool({ connectionString: myURI });

module.exports = {
  query: function (text, params, cb) {
    return pool.query(text, paramscb);
  },
};
