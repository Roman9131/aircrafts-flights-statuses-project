import * as React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootSaga from './sagas';
import redusers from './redusers';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(redusers, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(rootSaga);

reactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
