import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login'
function Main () {
  return (
    <Router>
      <Link to='/login'>toLogin</Link>
      <Route  path='/login' component={Login}/>
    </Router>
    
  )
}

export default Main