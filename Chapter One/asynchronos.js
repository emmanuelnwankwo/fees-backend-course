const https = require('https');
const fs = require('fs').promises;


async function fetchData(url) {
    // const response = await https.get(url);
    // const data = await response.on('data', () => {});
    // console.log(data)
    // return data;
    let data = '';
   const d = https.get(url, (resp) => {
       
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
          console.log(data)
          return data;
        });
       
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(JSON.parse(data).explanation);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
//       console.log(d.)
  }


//   fetchData('https://google.com');
//   fetchData('https://api.coindesk.com/v1/bpi/currentprice.json');


  async function readFile(path) {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function writeFile(path, content) {
    try {
      await fs.writeFile(path, content, 'utf-8');
      console.log('File written successfully!');
    } catch (err) {
      console.error(err);
    }
  }
  
  readFile('output.txt')
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
  
  writeFile('output.txt', 'This is some new content')
    .then(() => console.log('File written successfully!'))
    .catch((err) => console.error(err));

    setTimeout(() => console.log(2), 500);

    new Promise(() => {})



    /// Sync code

    function testFunct() {
        console.log('Inside test function');
        console.log('process some codes');
    }

    console.log('START');

    setTimeout(() => {
        console.log('Inside seTimeout');

    }, 5000)

    const items = ['movies', 'users', 'episode'];

    items.forEach(item => {
        console.log(item);
    })

    console.log('END')