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

const env = validateEnv(envScheme);

module.exports = {
    env
}