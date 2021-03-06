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


module.exports = function(app){
	app.appActions.create("submit:newEvent")
	.validate({
		type: "object",
		properties:{
			name: {
				type: "string",
				maxLength: 10
			},
			description:{
				type: "string"
			},
			date:{
				type: "object"
			}			
		},
		required: ['name', 'description', 'date']

	})
	.post('/api/events')
	.emit('events:add')
	.log()
	.transitionTo('events')
	.catchEmit('submit:newEvent:rejected');

	return [
	<DefaultRoute handler = {require('./EventsComponent')} action={getEvents} stores={EventsStore} />
	,<Route name="events" path="events" handler = {require('./EventsComponent')} action={getEvents} stores={EventsStore}/>
	,<Route name="createEvent" path="event/create" handler = {require('./EventFormComponent')} action={getEvents} stores={EventFormStore}/>
	,<Route name="event" path="event/:id" handler = {require('./EventComponent')} />
	]
}
		