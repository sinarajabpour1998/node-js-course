const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is overview');
    } else if(pathName === '/product') {
        res.end('This is product!');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'test-header': 'test-header'
        });
        res.end('<h1>404 , page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});