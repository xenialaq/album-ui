import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import Photos from './pages/photos';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
);

function App() {
  return (
    <Provider store={store}>
      <Router basename="/app">
        <div>
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand">Album</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="pt-1 collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/photos">Photos</Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/photos/:page">
              {({ match }) => <Photos match={match} />}
            </Route>
            <Route path="/">
              <Photos />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
