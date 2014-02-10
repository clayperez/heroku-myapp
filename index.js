// index.js
// a comment
var express = require("express") ,
	mysql = require("mysql") ,
	logfmt = require("logfmt") ,
	app = express() ,
	nodedump = require("nodedump").dump ,
	MongoClient = require('mongodb').MongoClient ;

var connection = mysql.createConnection({
  host     : '72.3.204.212',
  user     : '554957_results',
  password : 'Moresby1$',
  database : '554957_liveresults'
});
connection.connect();

var dbOutput = {value:null};
var herokuDB_Connect = "mongodb://heroku_app22050986:Moresby1$@ds027779.mongolab.com:27779/heroku_app22050986";
MongoClient.connect(herokuDB_Connect, function(err, db) {
	if(err) {console.log(err);return;}

	var collection = db.collection('test_insert');
	collection.insert({a:2}, function(err, docs) {

		collection.count(function(err, count) {
			dbOutput = count;
			console.log(format("count = %s", count));
		});

		// Locate all the entries using find
		collection.find().toArray(function(err, results) {
			console.dir(results);
			// Let's close the db
			db.close();
		});
	});
})

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