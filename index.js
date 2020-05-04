const dbClient = require("./src/dao/DBClient.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// static files
app.use('/', express.static('./src/web'));


app.get('/test', (req, res) => res.send('Hello World!'));

app.post('/measurements', (req, res) => {
	const data = res.body;
	// insert data into SQL (dbClient)
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



dbClient.query('SELECT * FROM measurement', (err, res) => {
  console.log(res.fields);
  console.log(res.rows);
  dbClient.end();
});