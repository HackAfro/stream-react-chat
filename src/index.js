import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './pages/auth';
import AppProvider from './providers';

const Routes = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={App} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
