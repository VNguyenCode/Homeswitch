//express
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const authrouter = require('./authrouter')

//App Setup
app.use(morgan('combined')); // logging framework for incoming requests, used for debugging 
app.use(bodyParser.json({type : '*/*'})); // parse incoming requests - does it for JSON 

app.use('/signup', authrouter)

//Server Setup
const server = http.createServer(app)
const port = 3000;

// Server listening
server.listen(port, () => console.log(`Currently listening on port ${port}`));

