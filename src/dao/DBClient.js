const { Pool, Client } = require('pg');

const client = new Client({
  user: 'a50ghz_user',
  host: 'myxomopx.ru',
  database: 'a50ghz',
  password: 'magic_measurements',
  port: 10433,
});
client.connect();

module.exports = client;