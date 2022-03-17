var express = require('express');
var mysql = require("mysql2");
var inquirer = require("inquirer");
var table = require("console.table");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");
var connection = require("./routes/connection");
var prompts = require("./routes/prompts");
require("console.table");

// Initialize the app and create a port
var PORT = process.env.PORT || 3001;
var app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(apiRoutes);
app.use(htmlRoutes);

// Start the server on the port
app.listen(PORT, function() {
    console.log('Listening on PORT: ' + PORT);
});