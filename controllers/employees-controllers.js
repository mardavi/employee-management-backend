//justine and trizha
const HttpError = require("../models/http=error");
const { validationeResult } = require ("express-validator");
const Employee = require("../models/employee");
const employee= require("../models/employee");

const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.pid;

    let employeeInfo;
    try{
        employeeInfo = await Employee.findById(EmployeeId);
    }catch(err){
        return next (new HttpError("Something went wrong, could not find the employee .", 500));
    }

    if(!employeeInfo){
        return next(new HttpError("Could not find the employee for the provided employee id.", 404));
    }

    res.json({employee: employeeInfo.toObject({getters: true})});
}

const createEmployee = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log(errors);
        const error = new HttpError("Invalid Input, Please enter correct data!", 400);
        return next(error);
    }

    const { name, position, department, email, phone } = req.body;

    const newEmployee = new Employee({
        name, position, department, email, phone
    });

    try{
        await newEmployee.save();
    }catch(err){
        const error = new HttpError("Creating new employee failed, please try again later.", 500);
        return next(error);
    }

    res.status(201).json({Employee: newEmployee.toObject({getters : true})});
};