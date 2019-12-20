import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// COMPONENTS
import Login from './components/Login';

function App() {
  return (
    <Router>
    <div className="App">
      <Link to='/login'>Login</Link> <br/>
      <Link to='/protected'>Jokes</Link>
      <Switch>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>

    </Router>
  );
}

export default App;
