// Sync code

function testFunct() {
    console.log('Inside test function');
    console.log('Process some code here');
}

console.log('START');

// Async code 
setTimeout(() => {
    console.log('Inside timeout');
}, 2000)

console.log('END');