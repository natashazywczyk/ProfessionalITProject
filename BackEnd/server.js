// Create Express Application
const express = require('express');
const app = express();
const port = 4000;

// Add CORS Middleware
const cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Add Body-parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Server Connection String
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.n2bkl.mongodb.net/TriviaStatDB');

// Stored data
const profileSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    score: { type: Number, default: 0 }, // Ensure score is a number
    uid: { type: String, required: true, unique: true },
})

// Initialize model based schema
const profileModel = new mongoose.model('myprofiles', profileSchema);

// Find all profiles in database
app.get('/api/profiles', async (req, res) => {
    try {
        const profiles = await profileModel.find({});
        console.log("Profiles found");
        res.status(200).json({ profiles }); // Send profiles back to the frontend
    } 
    catch (error) {
        console.error("Error getting profiles:", error);
    }
});

// Push profile data to database
app.post('/api/profiles', async (req, res) => {

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

        console.log('Saved profile:', newProfile);
    } 
    catch (error) {
        console.error('Error saving profile:', error);
    }
})

// Handle updating the UID after login
app.post('/api/update-profile', async (req, res) => {
    const { uid, email } = req.body;

    try {
        // Find the profile by email
        const profile = await profileModel.findOne({ email: email });

        if (profile) {
            // Update the profile with the Firebase UID
            profile.uid = uid;
            await profile.save();
        } 
        else {
            console.error("Profile couldn't be found: ", error);
        }
    } 
    catch (error) {
        console.error("Error updating profile:", error);
    }
});

// Handle updating the score in the database
app.post('/api/updatescore', async (req, res) => {
    const { uid, score } = req.body;

    try {
        const updatedProfile = await profileModel.findOneAndUpdate(
            { uid: uid },
            { $inc: { score: score } }, // Increase score
            { new: true } // Show new score update with profile
        );

        if (updatedProfile) {
            console.log("Updated score successfully");
        } 
        else {
            console.error("Profile was not found: ", error);
        }
    } 
    catch (error) {
        console.error('Error updating score:', error);
    }
});

// Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
