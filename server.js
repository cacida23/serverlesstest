let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
let {readFile, writeFile} = require('./httpserver'),
    mime = require('mime'),
    qs = require('qs');

let readVOTE = function readVOTE() {
    return readFile(`./json/VOTE.JSON`).then(result => {
        return JSON.parse(result);
    });
};

//=>创建WEB服务
let port = 8686;
let handle = function handle(req, res) {
    //=>客户端请求资源文件(PATH-NAME)，服务器端都是到STATIC文件夹中进行读取，也是根据客户端请求的路径名称读取的，服务器端基于FS读取文件中内容的时候，直接加上“./static”即可
    let {pathname, query} = url.parse(req.url, true),
        pathREG = /\.([a-z0-9]+)$/i;

    //=>静态资源文件处理
    if (pathREG.test(pathname)) {
        readFile(`./static${pathname}`).then(result => {
            //=>读取成功：根据请求资源文件的类型，设置响应内容的MIME
            let suffix = pathREG.exec(pathname)[1];
            res.writeHead(200, {
                'content-type': `${mime.getType(suffix)};charset=utf-8;`
            });
            res.end(result);
        }).catch(error => {
            //=>读取失败:最可能由于文件不存在而读取失败(也就是客户端请求的地址是错误的 ,我们应该响应的内容是404)
            res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            res.end('NOT FOUND!');
        });
        return;
    }
   
    //=>请求的都不是以上API接口,直接404即可
    res.writeHead(404);
    res.end('');
};
http.createServer(handle).listen(port, () => {
    console.log(`server is success，listen on 127.0.0.1:${port}`);
});
