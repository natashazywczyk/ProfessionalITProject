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
    profilePicture: String,
    score: String
})

//Initialize model based schema
const profileModel = new mongoose.model('myprofiles', profileSchema);

//Find all profiles in database
app.get('/api/profiles', async (req, res) => {
    const profiles = await profileModel.find({});

    res.status(200).json({profiles})
});

// Fetch all profiles as a list
app.get('/api/profiles/list', async (req, res) => {
    try {
        const profiles = await profileModel.find({}, 'username'); // Fetch only usernames
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error });
    }
});

//Push profile data to database
app.post('/api/profiles', async (req, res)=>{

    const { username, password, profilePicture, score } = req.body;
   
    const newProfile = new profileModel({ username, password, profilePicture, score });
    await newProfile.save(); //wait until last process is finished
   
    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
})

//Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});