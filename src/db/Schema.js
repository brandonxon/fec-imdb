const db = require('./db');
const Schema = db.Schema;

const CastSchema = new Schema({
  // id: Number,
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  cast: String,
  photos: String,
});

  // STORY LINE
const StorySchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  storyline: String,
  plotKeyWords: String,
  //Array
  taglines: String,
  movieRating: String,
  mpaa: String,
  genres: String,
  //Array
});

  // DETAILS
const DetailSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },  
  country: String,
  languages: String,
  //Array
  releaseDate: String,
  aKa: String,
  officialSites: String,
  //Array
  filmingLocations: String,
  //Array
});

  // BOX OFFICE
const BoxoffSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  }, 
  budget: String,
  openingWeekend: String,
  gross: String,
  cumulative: String,
});

  // CREDITS
const CreditSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  }, 
  productionCo: String,
  //Array
  runtime: String,
  soundMix: String,
  color: String,
  // aspectRatio: String,
});

const DidSchema = new Schema({
  trivia: String,
  goofs: String,
  quotes: String,
  crazyCredits: String, 
  connections: String,
  soundtracks: Array,
  faq: Array,
})

module.exports = {
  CastSchema,
  StorySchema,
  DetailSchema,
  BoxoffSchema,
  CreditSchema,
  DidSchema
};