// index.js
// a comment
var express = require("express") ,
	mysql = require("mysql") ,
	logfmt = require("logfmt") ,
	app = express() ,
	nodedump = require("nodedump").dump ,
	mongoose = require('mongoose') ;

var connection = mysql.createConnection({
  host     : '72.3.204.212',
  user     : '554957_results',
  password : 'Moresby1$',
  database : '554957_liveresults'
});
connection.connect();


mongoose.connect("mongodb://heroku_app22050986:bat78h2b769lmo755bq13tspi3@ds027779.mongolab.com:27779/heroku_app22050986");
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
  console.log("YES!",process.env);
});


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	connection.query('SELECT * FROM rhesusCategories', function(err, rows, fields) {
	  if (err) {throw err;}
	  res.send( "Hello World!" + nodedump(dbOutput) );
	});

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});