//note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //console.log(db)

	app.get('/viewnotes', function(req, res){
    //console.log(req)
    var notes = [];
		db.collection('notes').find().toArray(function(err, collInfos) {
    	// collInfos is an array of collection info objects that look like:
    	 notes = collInfos
       res.send(notes);

	});
	});

	app.get('/notes/:id', (req, res) => {

		var id = req.params.id;
		const details = { '_id': new ObjectID(id) };
    	db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });

  });

	app.post('/notes', (req, res) => {
    // You'll create your note here.
    console.log(req.body)
    const note = { text: req.body.body, title: req.body.title };
		//if(note.text.length || note.title.length){
	    db.collection('notes').insert(note, (err, result) => {
	      if (err) {
	        res.send({ 'error': 'An error has occurred' });
	      } else {
	        res.send(result.ops[0]);
	      }
	  	});
		//}

  });

	app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.text, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

	app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.text, title: req.body.title };
    db.collection('notes').remove(details, {safe: true}, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

};
