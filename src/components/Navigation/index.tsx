import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.sass';

export default class Navigation extends React.PureComponent {
  render() {
    return (
      <header className="nav">
        <NavLink activeClassName="nav__item_active" className="nav__item" to="/departures">Departures</NavLink>
        <NavLink activeClassName="nav__item_active" className="nav__item" to="/arrival">Arrivals</NavLink>
      </header>
    );
  }
}
