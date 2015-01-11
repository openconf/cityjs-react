var AppComponent = require('./components/app');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = (
  <Route handler={AppComponent}>
  </Route>
);