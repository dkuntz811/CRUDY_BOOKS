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

router.post('/', function (req, res) {
	var book = req.body;

	pg.connect(connectionString, function (err, client, done){
	   if (err){
			 res.sendStatus(500);
		 }
		 client.query('INSERT INTO books (author, title, published, genre, edition, publisher)'
	 						+ 'VALUES ($1, $2, $3, $4, $5, $6)', //I am expecting that $1 is going to be author varchar(200) from server
						  [book.author, book.title, book.published, book.genre, book.edition, book.publisher],
						function (err, result){
							done();

							if (err) {
								res.sendStatus(500);
							}
							res.sendStatus(201);
						});

	});
});
router.put('/:id', function (req, res) {
	var id = req.params.id;
	var book = req.body;
	console.log('this is weird')

	pg.connect(connectionString, function (err, client, done){
		if(err) {
			console.log('error is here');
			res.sendStatus(500);
		}
		client.query('UPDATE books ' +
						'SET title = $1, ' +
						'author = $2, ' +
						'published = $3, ' +
						'genre = $4, ' +
						'edition = $5, ' +
						'publisher = $6 ' +
					  'WHERE id = $7 ',
						[book.title, book.author, book.published, book.genre, book.edition, book.publisher, id],
				function (err, result) {
					done();
					if (err) {
						console.log('error here', err);
						res.sendStatus(500);
					} else {
						res.sendStatus(200);
					}
				})
	});
});
router.delete('/:id', function (req, res) {
	var id = req.params.id;

	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
		}
		client.query('DELETE FROM books ' +
	                'WHERE id = $1',
								   [id],
								 function (err, result) {
									 done();

									 if (err) {
										 res.sendStatus(500);
										 return;
									 }

									 res.sendStatus(200);
								 });
	});

});

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
//use id like in delete
router.get('/:id', function(req, res) {
    var bookgenre = req.params.genre;
    console.log('genre ', genre);

    console.log(bookgenre);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
   //sending back to client only books from a specific genre
        client.query('SELECT * FROM books ' +
            'WHERE genre = $1', [genre],
            function(err, result) {
                done();
								console.log(genre);

                if (err) {
                    console.log('err', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                    res.send(result.rows);

                }
            });
    });
});
module.exports=router;
