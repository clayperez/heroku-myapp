// index.js
// a comment
var express = require("express");
var mysql = require("mysql");
var logfmt = require("logfmt");
var app = express();
var nodedump = require("nodedump").dump;

var connection = mysql.createConnection({
  host     : '72.3.204.212',
  user     : '554957_results',
  password : 'Moresby1$',
  database : '554957_liveresults'
});
connection.connect();


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	connection.query('SELECT * FROM rhesusCategories', function(err, rows, fields) {
	  if (err) {throw err;}
	  res.send("<body>Hello World!</body><br>Results: %j"+nodedump(rows[0]));
	});

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});