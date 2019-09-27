import React from 'react';

import {
  Route, BrowserRouter as Router, Redirect, Switch,
} from 'react-router-dom';

import './app.sass';
import DeparturesContainer from './containers/DeparturesContainer';
import ArrivalsContainer from './containers/ArrivalsContainer';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/departures" />
      <Route exact path="/arrival" component={ArrivalsContainer} />
      <Route exact path="/departures" component={DeparturesContainer} />
    </Switch>
  </Router>
);

export default App;
