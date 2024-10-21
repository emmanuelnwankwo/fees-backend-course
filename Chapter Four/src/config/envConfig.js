const { validateEnv } = require('env-core');


const envScheme = {
    PORT: {
        type: Number,
        default: 3000
    },
    JWT_SECRET: String,
    NODE_ENV: String,
    MONGODB_URI: String
}
console.log('process: ', process.env.NODE_ENV);
const env = validateEnv(envScheme);

module.exports = {
    env
}