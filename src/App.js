import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './pages/auth';
import Home from './pages/home';
import AppProvider from './providers';

import './App.css';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

export default App;
