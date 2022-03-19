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
    // console.log('Listening on PORT: ' + PORT);
});


const whatToDo = [
    {
        type: 'rawlist',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all roles', 'View all departments', 'Add employee'],
    }
]

const askAgain = [
    {
        type: 'confirm',
        name: 'startAgain',
        message: "Would you like to ask again?"
    }
]

const start = () => { inquirer.prompt(whatToDo).then(answer => {
    // console.log(answer.userChoice)
    //based on your answer I will do different things
       switch (answer.userChoice) {
           case 'View all employees':
               console.log('user chose to see employees'); //console log is a placeholder to know that this ran, but now you can add new functionality
               connection.query("SELECT * FROM employee_trackerdb.employee", function(err, result) {
                if (err) throw err;
                console.table(result)
                inquirer.prompt(askAgain).then(answer => {
                    if (answer.startAgain) {
                        start();
                    }
                })
            })
               break;
            case 'View all roles':
                console.log('user chose to see roles');
                connection.query("SELECT * FROM employee_trackerdb.role", function(err, result) {
                    if (err) throw err;
                    console.table(result)
                    inquirer.prompt(askAgain).then(answer => {
                        if (answer.startAgain) {
                            start();
                        }
                    })
                })
                break;
            case 'View all departments':
                connection.query("SELECT * FROM employee_trackerdb.department", function(err, result) {
                    if (err) throw err;
                    console.table(result)
                    inquirer.prompt(askAgain).then(answer => {
                        if (answer.startAgain) {
                            start();
                        }
                        else console.log('bye')
                    })
                })
                console.log('user chose to see departments');
                break;
            case 'Add employee':
                console.log('user chose to add an employee');
                break;
                //here you will add the rest of the cases

           default:
               break;
        }
})

}

start();

