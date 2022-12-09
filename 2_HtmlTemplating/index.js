const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.title);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRICE%}/g, product.price);

  return output;
}

// read file one time
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const productData = JSON.parse(data);
console.log(productData);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        //console.log(cardsHtml);

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    } else if(pathName === '/product') {
        // Product Page
        res.end('This is product!');


    } else if (pathName === '/api') {
        // API
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        // not found
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