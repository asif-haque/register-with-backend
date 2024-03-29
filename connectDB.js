const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/register', (req, res) => {
    const userData = req.body;
    const newUser = new User(userData);
    newUser.save()
        .then(savedUser => {
            console.log('User saved successfully:', savedUser);
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error saving user:', error);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
