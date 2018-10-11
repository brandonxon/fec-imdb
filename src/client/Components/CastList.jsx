import React from 'react';
import CastListItem from './CastListItem.jsx';

import styles from './styles/CastList.css';

const CastList = ({ cast }) => {
  return (
    <div className={ styles.container }>
      <h3 className={ styles.heading }>Cast</h3>
      <p>Cast overview, first billed only:</p>
      <div className={ styles['cast-list-container'] }>
        {
          cast.map((castMember, index) => (
            <CastListItem key={index} url={ `https://s3.amazonaws.com/uifaces/faces/twitter/${castMember.url}` } name={ castMember.name } character={ castMember.character } />
          ))
        }
      </div>
      <h4 className={ styles['footer-link'] }>See full cast...</h4>
    </div>
  );
};

export default CastList;