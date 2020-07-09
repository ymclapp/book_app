'use strict';

const superagent = require('superagent');
const client = require('../data/db');

function booksHandler(request,response) {
  console.log(request.body)
  const url = 'https://www.googleapis.com/books/v1/volumes';
  // const author = request.query.latitude;
  // const title =  request.query.longitude;
  
  superagent.get(url)
    .query({
      // key:  process.env.BOOKS_API_KEY,
      q: `+in${request.body.search}:${request.body.query}`
    })
    .then((booksResponse) => {
      let booksData = json.parse(booksResponse.text);
      let bookReturn = booksData.items.map(book => {
        return new Book(book);
      });
      // response.send(bookReturn);
      response.render('../pages/searches/show');
    })
    // .catch((err)=>{
    //   errorHandler(err,request,response);
    // });
}

function Book(googleData) {
  this.title = googleData.volumeInfo.title;
  this.authors = googleData.volumeInfo.authors;
  this.description = googleData.volumeInfo.description;
  this.image = googleData.volumeInfo.imageLinks.smallThumnail;
}


module.exports = booksHandler;