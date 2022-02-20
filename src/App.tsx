import React from 'react';
import {
  Route, BrowserRouter as Router, Redirect, Switch,
} from 'react-router-dom';
import DeparturesContainer from './containers/DeparturesContainer';
import ArrivalsContainer from './containers/ArrivalsContainer';
import './app.scss';

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
