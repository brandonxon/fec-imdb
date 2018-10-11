const mongoose = require('./db');
const helper = require('./helper')

const {
  CastSchema,
  StorySchema,
  DetailSchema,
  BoxoffSchema,
  CreditSchema
} = require('./Schema');

const MovieDetail = {};

const Castdt = mongoose.model('Castdt', CastSchema);
const Storydt = mongoose.model('Storydt', StorySchema);
const Detaildt = mongoose.model('Detaildt', DetailSchema);
const Boxoffdt = mongoose.model('Boxoffdt', BoxoffSchema);
const Creditdt = mongoose.model('Creditdt', CreditSchema);

async function createMovie(cb) {
  await mongoose.connection.db.collection('currentid', function(err, collection) {
    let previd;
    collection.findOne({cid: 'current'}).then((data) => {
      previd = data.id;
      collection.updateOne({cid: 'current'}, { $set: {cid: 'current', id: previd + 1} }, {upsert: true}).then((data) => {
        helper(previd).then(obj => {
          result = obj.budget;
          Castdt.findOneAndUpdate({id: previd}, { $set: {id: previd, title:obj.title, cast:JSON.stringify(obj.cast), photos:JSON.stringify(obj.photos)} }, {upsert: true}).then((re) => {});
          Storydt.findOneAndUpdate({id: previd}, { $set: {id: previd, storyline:obj.storyline, plotkeywords:JSON.stringify(obj.plotkeywords), taglines: obj.taglines, movieRating: obj.movieRating, mpaa: obj.mpaa, genres:JSON.stringify(obj.genres)} }, {upsert: true}).then((re) => {});
          Detaildt.findOneAndUpdate({id: previd}, { $set: {id: previd, country:obj.country, languages:JSON.stringify(obj.languages), releaseDate: obj.releaseDate, aka: obj.aka, officialSites:JSON.stringify(obj.officialSites), filminglocation: JSON.stringify(obj.filminglocation)} }, {upsert: true}).then((re) => {});
          Boxoffdt.findOneAndUpdate({id: previd}, { $set: {id: previd, budget:obj.budget, openingWeekend: obj.openingWeekend, gross: obj.gross, cumulative: obj.cumulative} }, {upsert: true}).then((re) => {});
          Creditdt.findOneAndUpdate({id: previd}, { $set: {id: previd, runtime:obj.runtime, productionCo:JSON.stringify(obj.productionCo), soundMix: obj.soundMix, color:obj.color} }, {upsert: true}).then((re) => {});
        })
      })
    })
  });
}

async function deleteMovie(movieId) {
  try {
    const result = await MovieDetail.deleteOne({ id : movieId });
    return result;
  } catch(err) {
    return err;
  }
}

function getMovie(movieId, cb) {
  // find movie by id 
  let result = {};
  function retrieve(dbse) {
    return new Promise (function(resolve, reject) {
      let obj= dbse.findOne( {id: movieId} );
      resolve(obj);
    })
  }
  // retrieve(Castdt);

  try {
    retrieve(Castdt).then( obje => {
      result = Object.assign(obje.toObject());
      retrieve(Storydt).then( obje => {
        Object.assign(result,obje.toObject());
        retrieve(Detaildt).then( obje => {
          result = {...result, ...obje.toObject()};
          retrieve(Boxoffdt).then( obje => {
            result = {...result, ...obje.toObject()};
            retrieve(Creditdt).then( obje => {
              result = {...result, ...obje.toObject()};
              cb(result);
            }).catch(err => {console.log(err, 'credit')})
          }).catch(err => {console.log(err, 'boxoff')})
        }).catch(err => {console.log(err, 'detail')})
      }).catch(err => {console.log(err, 'story')})
    }).catch(err => {console.log(err,'cast')});
  } catch(err) {
    return err;
  }
}

// async function editMovie(movieId, section, text) {
//   //
//   try {
//     const result = await MovieDetail.findOneAndUpdate({ id: movieId }, {
//       [section]: text
//     }, { new: true });
//     return result;
//   } catch(err) {
//     return err;
//   }
// }

// async function createMovieReview(movieReviewData) {
//   try {
//     const result = await MovieReview.create(movieReviewData);
//     return result;
//   } catch(err) {
//     return err;
//   }
// }

// async function getMovieReview(reviewId) {
//   try {
//     const result = await MovieReview.findOne({ id: reviewId });
//     return result;
//   } catch(err) {
//     return err;
//   }
// }

// async function deleteMovieReview(reviewId) {
//   try {
//     const result = await MovieReview.deleteOne({id: reviewId });
//     return result;
//   } catch(err) {
//     return err;
//   }
// }

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  // editMovie,
  // getMovieReview,
  // createMovieReview,
  // deleteMovieReview,
};