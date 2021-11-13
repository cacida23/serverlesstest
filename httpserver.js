const http = require('http');
const urlCom = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const mimeJson = require('./mime.json');
console.log(Object.keys(mime));
console.log(mime.Mime)

let server = http.createServer();
let url = require('url');
server.on('connection', function (socket) {
    console.log('客户端连接 ');
});
server.on('request', function (req, res) {
    let {url} = req;
    let urlHeader = './dist';
    let getPath = (url)=>{
        console.log(url);
        url = url.split('?')[0];
        return path.resolve(process.cwd(), urlHeader+url)
    }
    pathREG = /\.([a-z0-9]+)$/i;
    if(url=='/') {
        url = '/index.html'
    }
    let {pathname, query} = urlCom.parse(url, true);
    console.log(pathname);
   
    url = getPath(url)//这时候打开端口首页就是public/.index.html 
    console.log(url);   
    //接下里我们就可以读取文件了
    fs.readFile(url, 'utf8',(error,data)=>{
        if(!data) {
            res.end(null);
            return;
        }
        console.log(pathname, 'pathname');
        let suffix = pathREG.exec(pathname)[1];
        console.log(suffix);
        const mimeType = mimeJson[`.${suffix}`];
        console.log(mimeJson[`.${suffix}`]);
        const type = '';
        res.writeHead(200, {
            'content-type': `${mimeType};charset=utf-8;`
        });
        res.end(data);
    })
});
server.on('close', function (req, res) {
    console.log('服务器关闭 ');
});
server.on('error', function (err) {
    console.log('服务器错误 ');
});
server.listen(8080, function () {
    console.log('server started at http://localhost:8080');
});