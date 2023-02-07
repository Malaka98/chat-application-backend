const mongoose = require('mongoose');
require("dotenv").config();

let instance = null;
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;
const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;

class Database {
    constructor(uri) {
        if (!instance) {
            this.connect(uri);
            instance = this;
        }
        return instance;
    }

    connect(uri) {
        mongoose.set("strictQuery", false);
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB database connection established successfully');
        });
    }
}

module.exports = new Database(mongoUrl);
