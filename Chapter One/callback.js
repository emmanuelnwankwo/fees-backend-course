/// Sync code

function testFunct() {
    console.log('Inside test function');
    console.log('process some codes');
}

console.log('START');

// setTimeout(() => {
//     console.log('Inside seTimeout');
// }, 5000)

// const items = ['movies', 'users', 'episode'];

// items.forEach(item => {
//     console.log(item);
// })

testFunct();

console.log('END')

// Async
// function login(username, password) {
//     setTimeout(() => {
//         console.log('Fetched user details')
//         return { userName: username }
//     }, 5000)
// }

// const user = login('emmanuel', 1234);
// console.log(user);


function login(username, password, callback) {
    setTimeout(() => {
        console.log('Fetched user details')
        callback({ userName: username });
    }, 5000)
}

function getMovies(username, callback) {
    setTimeout(() => {
        console.log('fetched movies')
        callback(['episode_01', 'episode_02', 'episode_03'])
    }, 2000)
}

function getMovieDetails(movie, callback) {
    setTimeout(() => {
        console.log('fetched movies details')
        callback({ title: 'Movie title'})
    }, 2000)
}

const user = login('emmanuel', 1234, (user) => {
    console.log(user)
    getMovies(user.userName, (movies) => {
        console.log(movies);
        getMovieDetails(movies[0], details => { 
            console.log(details)
        })
    });
});
console.log(user);


/// Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({movie: 'Mount'})
    }, 2000)
});

promise.then(movie => {
    console.log(movie)
})