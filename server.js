'use strict';

// Load Environment Variables from the .env file.
require('dotenv').config();

// Application Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const router = express.router();
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
// const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');


// Application Setup
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.urlextencoded({ extended: false}));
app.use(bodyparser.json());
// app.use(express.static(__dirname + './public'));
app.use(expressLayouts);
// app.use(favicon(__dirname + '/public/styles/book_favicon.ico'));
app.use('/public', express.static('public'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.urlencoded({ extended: true}));


app.set('views', path.join(__dirname, 'views'));
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

router.post('handle',(request,response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  // https://codeforgeek.com/handle-get-post-request-express-4/
  console.log(request.body);
});

app.use("/", router);

// //require modules
const booksHandler = require('./modules/books');

app.post('/show', booksHandler)

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

