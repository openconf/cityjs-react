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

var clientAppMiddleware = require("./src/main");
//app.use(express.static("./assets"));
app.use(session({keys:['app']}))

app.use(bodyParser.json());

require('./dev-tools');
// use webpack dev server for serving js files
app.use('/js', function (req, res) {
  res.redirect('http://localhost:3001/js' + req.path);
});


app.use(clientAppMiddleware);

app.listen(3000);
