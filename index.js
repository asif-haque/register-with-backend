const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors"); 

const app = express();
const port = 3000;


mongoose
  .connect("mongodb://localhost:27017/UserDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { collection: 'users' });
const User = mongoose.model("User", userSchema);


app.use(express.json());
app.use(cors());


app.post("/register", (req, res) => {
  const userData = req.body;

  User.create(userData)
    .then(() => {
      console.log(userData.username, "added");
      return res.status(201).json(`${userData.username} added`);
    })
    .catch((err) => console.log(err));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    else{
    return res.status(200).json({ message: "Login successful" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});