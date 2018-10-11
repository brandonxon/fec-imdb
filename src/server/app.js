require('newrelic');
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('../db/models');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
      res.status(201).send(JSON.stringify('write'));
    })
    .catch(err => {
    });
});

module.exports = app;