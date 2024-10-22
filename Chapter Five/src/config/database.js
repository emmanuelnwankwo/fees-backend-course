const mongoose = require('mongoose');
const { env } = require('./envConfig');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
};

module.exports = connectDB;