var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Promise = require('es6-promise').Promise;

var ReactRouterAdapter = require("../lib/grailjs/ReactRouterAdapter");


require("./styles/main.scss");
require('./config');
var createApp = require("../lib/grailjs/RouteHandler");
var app = createApp();


//require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
var AppComponent = require('./components/app');

var routes = (
  <Route path="/" handler={AppComponent}>
    {require('./modules/events/events.js')(app)}
  </Route>
);

app.useRoutes(routes);




module.exports = app.init();


//*********************************************************
// this will be hidden in framework
// inject app, routes, appActions, Html

/**/