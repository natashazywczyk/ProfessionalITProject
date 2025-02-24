//Create Express Application
const express = require('express');
const app = express();
const port = 4000; 

//Add CORS Middleware
const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Add Body-parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database Server Connection String
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.n2bkl.mongodb.net/TriviaStatDB');

//Stored data
const profileSchema = new mongoose.Schema({
    username: String,
    password: String,
    correctQuestions: String,
    bestCategory: String,
    profileCreation: String
})

//Initialize model based schema
const profileModel = new mongoose.model('playerstats', profileSchema);

//Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});