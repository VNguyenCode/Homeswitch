//express
import express = require('express');
import http = require('http');
import bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
//App Setup




//Server Setup
const port = process.env.PORT || 3000 

app.listen(port, () => `Currently listening on port ${port}`)