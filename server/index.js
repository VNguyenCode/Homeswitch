//express
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authrouter = require('./authrouter')

//Server Setup
const server = http.createServer(app)
const port = 3000;

//App Setup
app.use(morgan('combined')); // logging framework for incoming requests, used for debugging 
app.use(bodyParser.json({type : '*/*'})); // parse incoming requests - does it for JSON 

app.use('/signup', authrouter)



//Global error handler 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    message: { err: 'an error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log('error', errorObj.log);
  res.status(errorObj.status || 500).send(errorObj.message);
});

// Server listening
server.listen(port, () => console.log(`Currently listening on port ${port}`));

