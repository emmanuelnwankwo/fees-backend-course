const promise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve({ movie: 'Mount' });
        // reject(new Error('Failed to fetch data'));
    }, 2000)
})

promise.then(movie => {
    console.log(movie);
}).catch(err => {
    console.log(err.message);
}).finally(() => {
    console.log('New movies finally');
})