const http = require('http');
require ('dotenv').config();
const { APP_PORT } = process.env;
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    let content = ''
    if (method === 'GET' && url === '/') {
        try {
            content = fs.readFileSync(path.resolve('files','home.md'), 
            'utf-8');
            content = marked.parse(content);
        } catch (error) {
            console.error(error);
        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end(content);
});

server.listen(APP_PORT, () => {
    console.log('Server is start the war, on port ' + APP_PORT);
});