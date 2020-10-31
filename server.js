// Empty JS object to act as endpoint for app data ....
projectData = {};

// Express to run server and routes ...
const express = require('express');

// Start up an instance of app ...
const app = express();

// Dependencies ...
const bodyParser = require('body-parser');

// Middleware ...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance ...
const cors = require('cors');
app.use(cors());

// Initializing the main project folder ...
app.use(express.static('website'));

const port = 8000;
// Spin up the server ...
const server = app.listen(port, listening);
// callback to debug ...
function listening (){
    console.log("Server Is Running");
    console.log(`Server Runing On Localhost: ${port} `);
}

// Initialize all route with a callback function
const myProjectData = [];
// Callback function to complete GET '/all'
app.get("/all", function (req, res){
    res.send(myProjectData)
    console.log(myProjectData)
});

// Post ROUTES...
app.post("/add", addNewEntry);
 function addNewEntry(req, res){
    newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
    } 
    myProjectData.push(newEntry);
    res.send(myProjectData)
    console.log(myProjectData)
};







