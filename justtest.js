// บันทึกข้อมูล request ได้แก่ วันที่, method, url ลงใน log file ในโฟลเดอร์ logs
// 3 วิธี => 1 Sync , 2 Async (callback) , 3 Promise async await

const http = require('http');
require('dotenv').config();
const { APP_PORT } = process.env;
const fs = require('fs/promises');
const path = require('path');

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    console.log(`Start ${url}`);

    try {
        await fs.stat('logs');
    } catch (error) {
        try {
            await fs.mkdir('logs');
        } catch (error) { }
    }

    const logContent = `${new Date()} : ${method} ${url}\n`;
    await fs.writeFile(path.join('logs', 'request.log'), logContent, { flag: 'a+' });

    console.log(`End ${url}`);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end('<h1>ล็อกหลบแบบดิจิทัลลลลลลลลล</h1>');
});

server.listen(APP_PORT, () => {
    console.log('Server is start the war, on port ' + APP_PORT);
});


