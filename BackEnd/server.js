//Create Express Application
const express = require('express');
const app = express();
const port = 4000;

//Add CORS Middleware
const cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
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
    email: String,
    password: String,
    profilePicture: String,
    score: String,
    uid: String
})

//Initialize model based schema
const profileModel = new mongoose.model('myprofiles', profileSchema);

// Find all profiles in database
app.get('/api/profiles', async (req, res) => {
    try {
        const profiles = await profileModel.find({});
        res.status(200).json(profiles); // Ensure this is an array
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

//Push profile data to database
app.post('/api/profiles', async (req, res) => {
    console.log('Received profile data:', req.body); // Add this debug log

    const { username, password, profilePicture, score, uid, email } = req.body;

    try {
        const newProfile = new profileModel({ 
            username, 
            password, 
            profilePicture, 
            score, 
            uid, 
            email 
        });
        await newProfile.save();

        console.log('Saved profile:', newProfile); // Add this debug log
        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
})

// New route to handle updating the UID after login
app.post('/api/update-profile', async (req, res) => {
    const { uid, email } = req.body;

    try {
        // Find the profile by email
        const profile = await profileModel.findOne({ email: email });

        if (profile) {
            // Update the profile with the Firebase UID
            profile.uid = uid;
            await profile.save();

            res.status(200).json({ message: 'Profile updated with UID successfully' });
        } 
        else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } 
    catch (error) {
        console.error('Error updating profile with UID:', error);
        res.status(500).json({ error: 'Failed to update profile with UID' });
    }
});

//Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
