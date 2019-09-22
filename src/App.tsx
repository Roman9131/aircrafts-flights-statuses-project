import React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import './app.sass';
import Departure from './containers/departures';
import General from './containers/general';
import Arrivals from './containers/arrivals';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/departures" />
        <Route exact path="/arrival" component={Arrivals}/>
        <Route exact path="/departures" component={Departure}/>
      </Switch>
    </Router>
  );
}

export default App;
