var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Navigation = Router.Navigation;
var PromisePiper = require("../../../lib/grailjs/PromisePiper");
var ContextMixin = require("../../../lib/grailjs/ContextMixin");
var EventsStore = require('./EventsStore');
var EventFormStore = require('./EventFormStore');


var getEvents = PromisePiper().get('/api/events').emit('events:get');


module.exports = [
	<DefaultRoute handler = {require('./EventsComponent')} action={getEvents} stores={EventsStore} />
	,<Route name="events" path="events" handler = {require('./EventsComponent')} action={getEvents} stores={EventsStore}/>
	,<Route name="createEvent" path="event/create" handler = {require('./EventFormComponent')} action={getEvents} stores={EventFormStore}/>
	,<Route name="event" path="event/:id" handler = {require('./EventComponent')} />
	]
		