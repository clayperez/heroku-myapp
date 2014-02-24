// index.js
// a comment
var express = require("express") ,
	logfmt = require("logfmt") ,
	app = express() ,
	nodedump = require("nodedump").dump ,
	mongoose = require('mongoose') ;


/////////////
// MONGODB //
/////////////
	var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

  	mongoose.connect( mongoUri , function (err, res) {
		if (err) { console.log ('ERROR connecting to: ' + mongoUri + '. ' + err); }
		else { console.log ('Succeeded connected to: ' + mongoUri); }
	});

	var userSchema = new mongoose.Schema({
		name: { first: String, last: { type: String, trim: true } },
		age: { type: Number, min: 0}
	});
	var PUser = mongoose.model('PowerUsers', userSchema);
	var newuser = new PUser ({ name: { first: 'John', last: '  Doe   ' }, age: 25 });
	newuser.save(function (err) {
		if (err) { console.log ('Error on save!'); }
	});

////////////
// LISTEN //
////////////

	var port = Number(process.env.PORT || 5000);
	app.use(logfmt.requestLogger());
	app.get('/', function(req, res) {
	  res.sendfile('index.html');
	});
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
