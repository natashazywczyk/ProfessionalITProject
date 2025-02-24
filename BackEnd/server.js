//Create Express Application
const express = require('express');
const app = express();
const port = 4000; 

//Only run on 4000 port when running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});