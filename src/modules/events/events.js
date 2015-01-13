var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Navigation = Router.Navigation;
var PromisePiper = require("../../../lib/grailjs/PromisePiper");
var ContextMixin = require("../../../lib/grailjs/ContextMixin");




var getEvents = PromisePiper().get('/api/events').emit('events:get');


module.exports = [
				<Route name="events" path="events" handler = {require('./EventsComponent')} action={getEvents}/>
				,<Route name="event" path="event"  path="event/:id" handler = {require('./EventComponent')} />
				]
		
		


