'use strict';

const superagent = require('superagent');
const client = require('../util/db');

function booksHandler(request,response) {
  const author = request.query.latitude;
  const title =  request.query.longitude;
  const url = 'https://www.googleapis.com/books/v1/volumes';
  superagent.get(url)
    .query({
      key:  process.env.BOOKS_API_KEY,
      q: +in${request.body.search}:${request.body.query},
    }).then((booksResponse) => {
      let booksData = json.parse(booksResponse.text);
      let dailyResults = booksData.map(dailyWeather=>{
        return new Book(dailyWeather);
      });
      response.send(dailyResults);
    }).catch((err)=>{
      errorHandler(err,request,response);
    });
}

function Book(weatherData) {
  this.forecast = weatherData.weather.description;
  this.time = new Date (weatherData.valid_date).toDateString();
}


module.exports = booksHandler;