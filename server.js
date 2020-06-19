'use strict';

// Load Environment Variables from the .env file.
require('dotenv').config();

// Application Dependencies
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
// const superagent = require('superagent');
const pg = require('pg');


// Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors()); // Middleware
// app.use(bodyParser());
app.use(express.static('./public'));
app.use(expressLayouts);
app.use(favicon(__dirname + '/public/styles/book_favicon.ico'));

// app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');


//Loading up EJS view files/pages
app.get('/', (request, response) => {
  response.render('pages/index')
})

app.get('/new', (request, response) => {
  response.render('pages/new')
})

app.get('/about', (request, response) => {
  response.render('pages/about')
})

app.get('/error', (request, response) => {
  response.render('pages/error');
});


//require modules

// const client = require('./util/db');
// const locationHandler = require('./modules/locations');
// const errorHandler = require('./modules/errors');
// const notFoundHandler = require('./modules/errors');


// Add routes
// app.get('/hello', locationHandler);


// Has to happen after everything else
// app.use(notFoundHandler);
// Has to happen after the error might have occurred
// app.use(errorHandler); // Error Middleware

//Make sure the server is listening for requests
app.listen(PORT, () => console.log(`http://localhost:${PORT} show me the money`));

