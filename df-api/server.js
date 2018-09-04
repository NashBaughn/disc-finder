const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const routes = require('./routes');
const db = require('./database/db');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

routes(app);

db.init()
.then(() => {
	app.listen(port, host, (err) => {
		if(err) {console.log("some error: "+err)}
		console.log("Listening on "+host+":"+port)
	});
}).catch((err) => {
	console.log("some error: "+err)
});


