require('dotenv').config();
const http = require('http');
const mysql = require('mysql2/promise');
const { start } = require('repl');

const { APP_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOSTNAME, MYSQL_PORT, MYSQL_DB } = process.env;

const dbConnectionString = `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOSTNAME}:${MYSQL_PORT}/${MYSQL_DB}`;

async function startApp() {
    const db = await mysql.createConnection(dbConnectionString);

    const server = http.createServer( async (req, res) => {
        const { method, url } = req;

        if (method === 'GET' && url === '/') {
            const results = await db.query('SELECT * FROM products');
            const resultsString = results[0].map(item => `<p>${item.title}</p>`).toString();
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.statusCode = 200;
            res.end('<h1>Home page</h1>' + resultsString);
        }
        else if (method === 'GET' && url === '/about') {
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.statusCode = 200;
            res.end('About page');
        }
    });

    server.listen(APP_PORT, () => {
        console.log('Server is start the war, on port ' + APP_PORT);
    });
}

startApp();