const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// Middleware 
app.use((req, res, next) => {
    throw new HttpError("The requested URL was not found on this server.", 404);
});

//mandatory middleware to handle the error
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message } || "An unknown error occurred!"); 

});
mongoose
    .connect("mongodb+srv://mardavi:vIyTXKpLrR3xIJjR@cluster0.ntplj.mongodb.net/employee-management?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })