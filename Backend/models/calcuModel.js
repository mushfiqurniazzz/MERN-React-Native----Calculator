//importing the mongoose library to define the schema as it's easier to create a schema using the mongoose library
const mongoose = require('mongoose');

//we define the schema as calcuSchema which will be storing the first value, second value, the applied operation, result and the created at and updated at
const calcuSchema = new mongoose.Schema({
    //storing the first value of the calculation
    firstNum: {
        type: Number,
        required: true
    },
    //storing the second value of the calculation
    secondNum: {
        type: Number,
        required: true
    },
    //performing an operation on the given two values
    perfOperation: {
        type: String,
        required: true
    },
    //storing the result of first and second value of the calculation
    resultNum: {
        type: Number,
        required: true
    }
}, //by enabling this or setting the timesstamps as true we would be  able to have the created and edited at in our database
    {
        timestamps: true
    });

// Create the model in a varibale to export it and reuse it to declare and save in our database throughout our code
const calcuModel = mongoose.model('Calculations', calcuSchema);

//exporting the created variable
module.exports = calcuModel;
