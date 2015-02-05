var express = require('express');
var session = require('cookie-session');

var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');

require('node-jsx').install({harmony: true, extension: '.js'})
process.env.HOSTNAME = "http://localhost:3000"

require.extensions['.scss'] = function(){
	return null;
}
require.extensions['.less'] = function(){
	return null;
} 

var clientAppMiddleware = require("./src/main").middleware;

app.use(session({keys:['app']}))

app.use(bodyParser.json());

require('./dev-tools');
// use webpack dev server for serving js files
app.use('/js', function (req, res) {
  res.redirect('http://localhost:3001/js' + req.path);
});
//*******************************************
//temporary mock
	      
var Events = [
	  {
	    name: "KyivJs",
	    logo: "http://placehold.it/100x100",
	    description: "Best conference ever",
	    date: new Date(Date.now() + 86400000 * Math.random() * 30)
	  },
	  {
	    name: "OdessaJs",
	    logo: "http://placehold.it/100x100",
	    description: "Best conference ever",
	    date: new Date(Date.now() + 86400000 * Math.random() * 30)
	  },
	  {
	    name: "KharkivJs",
	    logo: "http://placehold.it/100x100",
	    description: "Best conference ever",
	    date: new Date(Date.now() + 86400000 * Math.random() * 30)
	  }
	];

app.use(bodyParser.json());
app.get("/api/events", function(req, res){
	res.json(Events);
});

app.post("/api/events", function(req, res){
	var Event = req.body;
	Event.id = Events.length;
	Event.logo = "http://placehold.it/100x100";
	Events.push(Event)
	res.json(Event);
});

app.put("/api/users/:id", function(req, res){
	var newEvent = req.body;
	Events[newEvent.id] = newEvent;
	res.json(newEvent);
});

app.get("/api/users/:id", function(req, res){
	res.json(Events[req.params.id]);
});
//*******************************************

app.use(clientAppMiddleware);

app.listen(3000);
