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
	mongoose.connect( process.env.MONGOLAB_URI , function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + uristring);
		}
	});

	var userSchema = new mongoose.Schema({
		name: { first: String, last: { type: String, trim: true } },
		age: { type: Number, min: 0}
	});
	var PUser = mongoose.model('PowerUsers', userSchema);
	var johndoe = new PUser ({ name: { first: 'John', last: '  Doe   ' }, age: 25 });
	johndoe.save(function (err) {if (err) console.log ('Error on save!')});

////////////
// LISTEN //
////////////
app.use(logfmt.requestLogger());
app.get('/', function(req, res) {
  res.send( "Hello World!" + nodedump(process.env) );
});
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});