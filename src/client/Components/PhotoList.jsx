import React from 'react';
import styles from './styles/PhotoList.css';
const Faker = require('faker');

let pho = Faker.image.avatar();
const PhotoList = ({ urls }) => {
  return (
    <div className={ styles.container }>
      <h3 className={ styles.heading }>Photos</h3>
  
      <div className={ styles['photos-container'] }>
        {
          urls.map((url, index) => (
            <img key={ index } className={ styles.photo } src={ `https://s3-us-west-1.amazonaws.com/kickstarter0data/new/${url}.jpg` }/>
          ))
        }
      </div>
      <h4 className={ styles['footer-link'] }>See all { urls.length } photos</h4>
    </div>
  )
}

export default PhotoList;