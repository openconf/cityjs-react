var BasicStoreFactory = require("../../../lib/grailjs/BasicStoreFactory");


module.exports = BasicStoreFactory('EventFormStore', {
	form: {
		errors:[],
		data:{}
	},
	init: function(context){
		context.actions.on('submit:newEvent:rejected', this.updateErrors.bind(this));
	},
	updateErrors: function(errorData){
		this.form.errors = errorData;
		this.emit('change', this.form);
	},
	get: function(){
		return this.form;
	}
});


