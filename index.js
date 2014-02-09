// index.js
// a comment
var express = require("express");
var mysql = require("mysql");
var logfmt = require("logfmt");
var app = express();

var connection = mysql.createConnection({
  host     : '72.3.204.212',
  user     : '554957_results',
  password : 'Moresby1$'
});


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	connection.connect();
	connection.query('USE 554957_liveresults; SELECT 1 + 1 AS solution', function(err, rows, fields) {
	  if (err) {throw err;}
	  res.send('Hello World! - '+rows[0].solution);
	});
	connection.end();

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});