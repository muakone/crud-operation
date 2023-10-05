const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

const userCollection = mongoose.model("users", userSchema)

module.exports = { userCollection }