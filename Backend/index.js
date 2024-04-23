//importing controller function, environmental variables, express library and function for connection to database
const express = require('express');
const app = express();
const ConDB = require("./config/conDB");
require("dotenv").config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const { calculationValuePasser } = require("./controllers/calcuControllers");

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//route for the created controller function that handles user inputs
app.post('/', calculationValuePasser);

//the database connection function
ConDB();

//making the app listen at port stored in environmental variable or 3001
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
