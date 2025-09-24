// บันทึกข้อมูล request ได้แก่ วันที่, method, url ลงใน log file ในโฟลเดอร์ logs
// 3 วิธี => 1 Sync , 2 Async (callback) , 3 Promise async await

const http = require('http');
require('dotenv').config();
const { APP_PORT } = process.env;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    console.log(`Start ${url}`);

    // วิธีที่ 1 Sync (บล็อกการทำงาน)
    // try {
    //     fs.statSync('logs');
    // }
    // catch(error){
    //     fs.mkdirSync('logs');
    // }

    // const logContent = `${new Date()} : ${method} ${url}\n`;
    // fs.writeFileSync(path.join('logs','request.log'),logContent, { flag: 'a+'});

    // วิธีที่ 2 Async (callback) (ไม่บล็อกการทำงาน)
    const logContent = `${new Date()} : ${method} ${url}\n`;
    fs.stat('logs', (error, stats) => {
        if (!!error) {
            fs.mkdir('logs', (error1) => {
                fs.writeFile(path.join('logs', 'request.log'), logContent, { flag: 'a+' }, (error2) => {
                    console.log(`End ${url}`);
                });
            });
            return;
        }
        fs.writeFile(path.join('logs', 'request.log'), logContent, { flag: 'a+' }, (error2) => {
            console.log(`End ${url}`);
        });
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end('<h1>ล็อกหลบแบบดิจิทัลลลลลลลลล</h1>');

});
server.listen(APP_PORT, () => {
    console.log('Server is start the war, on port ' + APP_PORT);
});

// ข้อดีของ Async คือ ไม่บล็อกการทำงานของโปรแกรมที่อยู่ข้างล่างถัดไป
// ข้อเสียของ Async คือ ไม่ได้เรียงลำดับการทำงาน
// สมมติ เราเขียน log file ช้า (เช่น log file ใหญ่) แล้วมี request เข้ามาพร้อมๆ กัน
