'use strict';

const superagent = require('superagent');
const client = require('../util/db');

function booksHandler(request,response) {
  const author = request.query.latitude;
  const title =  request.query.longitude;
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  superagent.get(url).query({
    key:  process.env.WEATHER_API_KEY,
    lon: lon,
    lat: lat
  }).then((weathResponse)=>{
    let weatherData = weathResponse.body.data;
    let dailyResults = weatherData.map(dailyWeather=>{
      return new Weather(dailyWeather);
    });
    response.send(dailyResults);
  }).catch((err)=>{
    errorHandler(err,request,response);
  });
}

function Weather(weatherData) {
  this.forecast = weatherData.weather.description;
  this.time = new Date (weatherData.valid_date).toDateString();
}


module.exports = weatherHandler;