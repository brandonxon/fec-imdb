require('newrelic');
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const models = require('../db/models');

const app = express();
// const logger = morgan('dev');


app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger);
app.use(express.static(path.join(__dirname, '/../../dist')));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/middle/api/movie/:movieId', (req, res) => {
  const { movieId } = req.params;
  models.getMovie(movieId, (result) => {
    res.send(JSON.stringify(result));
  })
});

// post route for section edits
app.post('/middle/api/new', (req, res) => {
  models.createMovie()
    .then(result => {
      res.send(JSON.stringify('write'));
    })
    .catch(err => {
    });
});

// app.get('/middle/api/review/:reviewId', (req, res) => {
//   const { reviewId } = req.params;

//   models.getMovieReview(reviewId)
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.send(JSON.stringify(err));
//     });
// });

module.exports = app;