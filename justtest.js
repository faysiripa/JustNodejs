// บันทึกข้อมูล request ได้แก่ วันที่, method, url ลงใน log file ในโฟลเดอร์ logs
// 3 วิธี => 1 Sync , 2 Async (callback) , 3 Promise async await

const http = require('http');
require ('dotenv').config();
const { APP_PORT } = process.env;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    console.log(`Start ${url}`);

    try {
        fs.statSync('logs');
    }
    catch(error){
        fs.mkdirSync('logs');
    }

    const logContent = `${new Date()} : ${method} ${url}\n`;
    fs.writeFileSync(path.join('logs','request.log'),logContent, { flag: 'a+'});

    console.log(`End ${url}`);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end('<h1>ล็อกหลบแบบดิจิทัลลลลลลลลล</h1>');
});

server.listen(APP_PORT, () => {
    console.log('Server is start the war, on port ' + APP_PORT);
});

// ข้อเสีย ถ้ามีลูกค้าจำนวนมากจะทำให้ server ช้า เพราะการเขียนไฟล์แบบ sync จะ block การทำงาน
// ข้อดี คือ เขียนง่าย ไม่ต้องยุ่งยากกับ callback หรือ promise