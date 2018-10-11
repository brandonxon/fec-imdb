import React, { Component } from 'react';
import PhotoList from './PhotoList.jsx';
import CastList from './CastList.jsx';
import Storyline from './Storyline.jsx';
import Details from './Details.jsx';
// import CompanyCredits from './CompanyCredits.jsx';
import BoxOffice from './BoxOffice.jsx';
// import DidYouKnow from './DidYouKnow.jsx';
import FAQ from './FAQ.jsx';
import Footer from './Footer.jsx';
// import Review from './Review.jsx';

import styles from './styles/App.css';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null,
    };
  }
  componentDidMount() {
    let rand = Math.floor(Math.random() * 10000000) + 1;
    // url: `middle/api/movie/${rand}`,
    const options = {
      url: `/middle/api/movie/${rand}`,
      method: 'get',
    };
    axios(options)
      .then(results => {
        this.setState({
          currentMovie: results.data,
        });
      })
      .catch(err => {});
  }
  render() {
    if (this.state.currentMovie) {
      return (
        <div className={ styles.root }>
          <div className={ styles.container }>
            <PhotoList urls={ this.state.currentMovie.photos.split(',') } />
            <CastList 
              cast={ JSON.parse(this.state.currentMovie.cast) } 
              movieId={ this.state.currentMovie.id }
            />
            <Storyline storyline={ this.state.currentMovie.storyline } plotKeyWords={ this.state.currentMovie.plotKeyWords.split(',') }
              taglines={ this.state.currentMovie.taglines } 
              genres={ this.state.currentMovie.genres.split(',') }
              movieId={ this.state.currentMovie.id }
              />
            <Details 
              aKa={ this.state.currentMovie.aKa }
              country={ this.state.currentMovie.country }
              languages={ this.state.currentMovie.languages.split(',') }
              releaseDate={ this.state.currentMovie.releaseDate }
              officialSites={ this.state.currentMovie.officialSites.split(',') }
              filmingLocations={ this.state.currentMovie.filmingLocations.split(',') }
              movieId={ this.state.currentMovie.id }
            />
            <BoxOffice
              budget={ this.state.currentMovie.budget }
              openingWeekend= { this.state.currentMovie.openingWeekend } 
              gross={ this.state.currentMovie.gross }
              cumulative= { this.state.currentMovie.cumulative }
              movieId={ this.state.currentMovie.id }
            />
            {/* <DidYouKnow
              trivia={ this.state.currentMovie.trivia }
              goofs={ this.state.currentMovie.goofs }
              quotes={ this.state.currentMovie.quotes }
              crazyCredits={ this.state.currentMovie.crazyCredits }
              connections={ this.state.currentMovie.connections }
              soundtracks= { this.state.currentMovie.soundtracks }
              movieId={ this.state.currentMovie.id }
            /> */}
            {/* <FAQ 
              questions={ this.state.currentMovie.faq } 
              movieId={ this.state.currentMovie.id }
            /> */}
            {/* <Review /> */}
            <Footer />
          </div>
        </div> 
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

// const App = () => {
//   return (
//     <div className={ styles.root }>
//       <div className={ styles.container }>
//         <PhotoList urls={ mockPhotoUrls } />
//         <CastList cast={ mockCast }/>
//         <Storyline storyline={ mockStoryline.storyline } plotKeyWords={ mockStoryline.plotKeyWords }
//           taglines={ mockStoryline.taglines } genres={ mockStoryline.genres }
//           />
//         <Details details={ mockDetails } />
//       </div>
//     </div> 
//   );
// }
