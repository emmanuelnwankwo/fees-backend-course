// Core modules
// Https, http, os, path, fs etc
// https://nodejs.org/api/modules.html

const https = require('https');
const fs = require('fs');


function fetchData(url) {
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
            console.log(data);
            return data;
        })
    }).on('error', (err) => {
        console.log('Error: ' + err.message);
    });
}

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
// fetchData(url);

async function writeFile(path, content) {
    try {
        await fs.writeFileSync(path, content, 'utf-8');
        console.log('File written successfully!')
    } catch (error) {
        console.log(error);
    }
}

async function readFile(path) {
    try {
        const content = fs.readFileSync(path, 'utf-8');
        return content;

    } catch (error) {
        console.log(error);
    }
}

async function main() {
    const path = 'output.txt';
    await writeFile(path, 'This is new content under modules. 1234');
    const outputData = await readFile(path);
    console.log('File content:  ' + outputData);
}

// main();

function fetch(url, method = 'GET', data = '') {
    const dataString = JSON.stringify(data)
  
    const options = {
      method: method
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Length': dataString?.length,
    //   },
    //   timeout: 1000, // in ms
    }
  
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        if (res.statusCode < 200 || res.statusCode > 299) {
          return reject(new Error(`HTTP status code ${res.statusCode}`))
        }
  
        const body = []
        res.on('data', (chunk) => body.push(chunk))
        res.on('end', () => {
          const resString = Buffer.concat(body).toString()
          resolve(resString)
        })
      })
  
      req.on('error', (err) => {
        reject(err)
      })
  
    //   req.on('timeout', () => {
    //     req.destroy()
    //     reject(new Error('Request time out'))
    //   })
  
    //   req.write(dataString)
      req.end()
    })
  }

  (async () => {
    const data = await fetch(url);
    console.log(data);
  })();