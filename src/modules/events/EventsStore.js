var BasicStoreFactory = require("../../../lib/grailjs/BasicStoreFactory");


module.exports = BasicStoreFactory('EventsStore', {
	events: [],
	init: function(context){
		context.actions.on('events:get', this.gotEvents.bind(this));
	},
	gotEvents: function(events){
		this.events = events;
		this.emit('change', this.events);
	},
	get: function(){
		return this.events;
	}
});


