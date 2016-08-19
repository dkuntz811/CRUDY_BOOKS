var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';
//

router.get('/', function (req, res){
	//Retrieve books from database
	pg.connect(connectionString, function(err, client, done){
		if (err){
			res.sendStatus(500);
		}
		client.query('SELECT * FROM books', function (err, result){
			done(); //put this here because the info has been received and is
              //ready to be sent below. this closes the connection to the server
			if (err) {
				res.sendStatus(500);
			}
			res.send(result.rows);
		});
	});

});

module.exports=router;
