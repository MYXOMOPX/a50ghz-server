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


const getQuery = (data) => ({
    text: 'INSERT INTO measurement(location, data, time) VALUES($1, $2, TO_TIMESTAMP($3::double precision / 1000))',
    values: ['('+data.geolocation.latitude+','+data.geolocation.longitude+')', data.measures, data.timestamp]
});

app.post('/measurements', (req, res) => {
	const data = req.body;
    console.log(data);
    dbClient.query(getQuery(data),(SQLerr, SQLres) => {
        console.log(data.timestamp)
        if (SQLerr) console.log("ERROR", SQLerr);
        res.send(SQLres);
    });
});

app.get("/measurements", (req, res) => {
    dbClient.query('SELECT location, data FROM measurement', (dbErr, dbRes) => {
        res.send(dbRes.rows);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


