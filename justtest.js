const http = require('http');
require ('dotenv').config();
const { APP_PORT } = process.env;
const fs = require('fs');
const { log } = require('console');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    const logContent = `${new Date()} : ${method} ${url}\n`;
    fs.writeFileSync('request.log',logContent, { flag: 'a+'});

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end('<h1>ล็อกหลบแบบดิจิทัลลลลลลลลล</h1>');
});

server.listen(APP_PORT, () => {
    console.log('Server is start the war, on port ' + APP_PORT);
});