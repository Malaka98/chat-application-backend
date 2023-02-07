const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    phone_number: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
});

const user = mongoose.model("users", userSchema);

module.exports = user
