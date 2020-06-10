'use strict';

// Load Environment Variables from the .env file.
require('dotenv').config();

// Application Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// const superagent = require('superagent');


// Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors()); // Middleware
app.use(bodyParser());
app.use(express.static('./public'));
app.use(expressLayouts);

app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index', {
    foo: 'bar'
  });
});
//require modules

const client = require('./util/db');
// const locationHandler = require('./modules/locations');
const errorHandler = require('./modules/errors');
const notFoundHandler = require('./modules/errors');


// Add routes
app.get('/hello', locationHandler);


// Has to happen after everything else
app.use(notFoundHandler);
// Has to happen after the error might have occurred
app.use(errorHandler); // Error Middleware

//Make sure the server is listening for requests
app.listen(3000,function() {
  console.log('heard on 3000');
});

