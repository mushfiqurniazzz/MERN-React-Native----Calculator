//importing the calcuModel as we will be saving every calculations done in our app
const calcuModel = require("../models/calcuModel");

//the main function that will be handling everything, every input, calculations, saving in database and also handling errors and we also passed a parammeter to the function that i will be explaining soon
const Calculations = async (Value) => {
    try {
        //all the cases that we would potentially be getting as input from the user
        let ifCaseResult;
        if (Value.operationValue === "+") {
            ifCaseResult = Value.firstValue + Value.secondValue;
        } else if (Value.operationValue === "-") {
            ifCaseResult = Value.firstValue - Value.secondValue;
        } else if (Value.operationValue === "*") {
            ifCaseResult = Value.firstValue * Value.secondValue;
        } else if (Value.operationValue === "/") {
            ifCaseResult = Value.firstValue / Value.secondValue;
        }
        //calling the model and then saving everything inside it like the firstvalue, secondvalue, operation and also the result
        const newCalculation = new calcuModel({
            firstNum: Value.firstValue,
            secondNum: Value.secondValue,
            perfOperation: Value.operationValue,
            resultNum: ifCaseResult,
        });
        const savedCalculation = await newCalculation.save();
        console.log('Calculation saved to the database: ', savedCalculation);
        return ifCaseResult;
    } catch (error) {
        //some basic error handling
        console.error(error);
        throw new Error("Error while performing calculations");
    }
};

//this is the function that is used to pass parameters to the main function and we used this becouse we can't use the function by just passing some const {variables here} = req.body it wont work that way
const calculationValuePasser = async (req, res) => {
    try {
        const result = await Calculations(req.body);
        res.status(200).json({ result });
    } catch (error) {
        console.error("Error calculating: ", error);
        res.status(500).send("Error calculating");
    }
};

//only exporting the value passer function as it is a parent funcion and we declared the main function as a child function
module.exports = { calculationValuePasser };
