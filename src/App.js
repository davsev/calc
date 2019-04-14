import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calc from './components/Calc';
import Login from './components/auth/Login';
import MechinaSetup from './components/adminarea/MechinaSetup';
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Calc}  />
        <Route path="/login" component={Login} />
        <Route path="/mechinasetup" component={MechinaSetup} />
      </BrowserRouter>
    );
  }
}

export default App;
