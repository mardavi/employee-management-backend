const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Employee = require("../models/employee");

const getAllEmployees = async (req, res, next) => {
    let employees;
    try {
        employees = await Employee.find();
    } catch (err) {
        return next(new HttpError("Fetching failed, please try again.", 500));
    }
    res.json({ employees: employees.map(emp => emp.toObject({ getters: true }))});
    }

const getEmployeeById = async (req, res, next) => {
    const employeeId = req.params.pid;

    let employeeInfo;
    try {
        employeeInfo = await Employee.findById(employeeId);
    } catch (err) {
        return next(new HttpError("Something went wrong, could not find the employee.", 500));
    }

    if (!employeeInfo) {
        return next(new HttpError("Could not find the employee for the provided employee id.", 404));
    }

    res.json({ employee: employeeInfo.toObject({ getters: true }) });
};

const createEmployee = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid Input, Please enter correct data!", 400);
        return next(error);
    }

    const { name, position, department, email, phone } = req.body;

    const newEmployee = new Employee({
        name, position, department, email, phone
    });

    try {
        await newEmployee.save();
    } catch (err) {
        const error = new HttpError("Creating new employee failed, please try again later.", 500);
        return next(error);
    }

    res.status(201).json({ employee: newEmployee.toObject({ getters: true }) });
};

const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.pid;

    let employeeInfo;
    try {
        employeeInfo = await Employee.findById(employeeId);
    } catch (err) {
        return next(new HttpError("Could not find employee profile to delete.", 500));
    }

    if (!employeeInfo) {
        return next(new HttpError("Employee profile does not exist.", 404));
    }

    try {
        await employeeInfo.deleteOne();
    } catch (err) {
        return next(new HttpError("Something went wrong, could not delete employee profile.", 500));
    }

    res.status(200).json({ message: "Employee profile deleted successfully." });
};

const updateEmployee = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError("Please enter correct data.", 400));
    }

    const { name, position, department, email, phone } = req.body;
    const employeeId = req.params.pid;

    let employeeInfo;
    try {
        employeeInfo = await Employee.findById(employeeId);
    } catch (err) {
        return next(new HttpError("Could not update employee profile.", 500));
    }

    if (!employeeInfo) {
        return next(new HttpError("Invalid employee ID. Could not find the employee profile.", 404));
    }
    try {
        await employeeInfo.save();
    } catch (err) {
        return next(new HttpError("Could not update the employee profile.", 500));
    }
    if (name) employeeInfo.name = name;
    if (position) employeeInfo.position = position;
    if (department) employeeInfo.department = department;
    if (email) employeeInfo.email = email;
    if (phone) employeeInfo.phone = phone;

    try {
        await employeeInfo.save();
    } catch (err) {
        return next(new HttpError("Something went wrong, could not update the employee profile.", 500));
    }

    res.status(200).json({ employee: employeeInfo.toObject({ getters: true }) });
};

exports.getEmployeeById = getEmployeeById;
exports.createEmployee = createEmployee;
exports.deleteEmployee = deleteEmployee;
exports.updateEmployee = updateEmployee;
exports.getAllEmployees = getAllEmployees;