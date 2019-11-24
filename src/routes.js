import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './containers/home';
import countDown from './containers/countDown';

import { connect, useSelector } from 'react-redux'

const Routes = () => {
  
  return (
    <BrowserRouter>
      <div>
        <Header/>       
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/Signup" component={SignUp}/>
          <Route exact path="/countDown" component={countDown}/>
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default connect(
  null,
  {}
)(Routes)
