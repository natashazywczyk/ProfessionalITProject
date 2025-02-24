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

//Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});