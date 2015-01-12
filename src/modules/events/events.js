var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var Navigation = Router.Navigation;
var ContextMixin = require("../../../lib/grailjs/ContextMixin");


module.exports = <Route name="events" path="events" 
	handler = {require('./EventsComponent')} />


