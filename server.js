'use strict';

// Load Environment Variables from the .env file.
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
// const superagent = require('superagent');


// Application Setup
const PORT = process.env.PORT;
const app = express();

app.use(cors()); // Middleware

// app.get('/', (request, response) => {
//   response.send('City Explorer Goes Here');
// });

app.use(express.static('./public'));

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
client.connect()
  .then (() => {
    console.log('PG Connected!');
    app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
  })
  .catch(err => {
    throw `PG error!: ${err.message}`;
  });