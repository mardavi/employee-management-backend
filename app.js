const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

// Tanjil middleware 

mongoose
    .connect("mongodb+srv://mardavi:vIyTXKpLrR3xIJjR@cluster0.ntplj.mongodb.net/employee-management?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })