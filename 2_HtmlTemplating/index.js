const fs = require('fs');
const http = require('http');
const url = require('url');

// read file one time
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const productData = JSON.parse(data);
console.log(productData);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is overview');
    } else if(pathName === '/product') {
        res.end('This is product!');
    } else if (pathName === '/api') {
        // read file every time
        // fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
        //
        //     if (err) throw err;
        //
        //     const productData = JSON.parse(data);
        //     console.log(productData);
        //
        //     res.writeHead(200, {
        //         'Content-type': 'application/json'
        //     });
        //     res.end(data);
        // })
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.end('<h1>404 , page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});