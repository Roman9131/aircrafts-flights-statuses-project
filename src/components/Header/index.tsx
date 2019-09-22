import React from 'react';
import './styles.sass';

import Navigation from '../Navigation';

export const Header = () => {
  return (
    <div className="header">
      <div className="airport-details">
          <div className="airport-code">
            <h2> SVO/UUEE </h2>
          </div>
          <div className="airport-name">
            <h1> Moscow Sheremetyevo International Airport </h1>
          </div>
          <div className="airport-location">
            <h3> Russia </h3>
          </div>
        </div>
      <Navigation/>
    </div>
  )
};
export default Header;