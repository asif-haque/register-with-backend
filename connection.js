const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UserDB')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

// Define the model using the schema
const User = mongoose.model('User', schema);

// Export the model for use in other files
module.exports = User;
