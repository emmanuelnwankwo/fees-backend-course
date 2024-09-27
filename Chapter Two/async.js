function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching user details');
            resolve({ userName: username });
        }, 2000);
    })
}

function getMovies(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fetched movies for the user, ' + username);
            resolve(['movie_01', 'movie_02', 'movie_03']);
        }, 3000)
    })

}

function getMovieDetails(movie) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fetched movie, ' + movie);
            resolve({ id: 1, title: 'Dune 2', name: 'movie_01' });
        }, 2000)
    })

}

console.log('START');

// login('emmanuel', 1234, (user) => {
//     console.log(user);
//     getMovies(user.userName, (movies) => {
//         console.log(movies);
//         getMovieDetails(movies[0], (details) => {
//             console.log(details);
//         })
//     })
// });
// console.log(user);

// login('emmanuel', 1234)
//     .then(user => getMovies(user.userName))
//     .then(movies => getMovieDetails(movies[0]))
//     .catch(err => console.log(err));

// async and await

async function main() {
    try {
        const user = await login('emmanuel', 1234);
        const movies = await getMovies(user.userName);
        const movieDetails = await getMovieDetails(movies[0]);
    } catch (error) {
        console.log(error);
    }
}

main();

console.log('END');