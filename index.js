const mysql = require("mysql2");
const inquirer = require("inquirer");
const { getMaxListeners, allowedNodeEnvironmentFlags } = require("process");
const { functionDeclaration } = require("@babel/types");
const { first } = require("rxjs");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3001",
  user: "rfields03@gmail.com",
  password: "Af983426!@"
  database: "employee_trackerDB"
})

connection.connect(function (err) {
  if (err) throw err;
  firstPrompt();
});

function firstPrompt(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'userChoice',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View Employees by Department',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Add Role',
        'Add Department',
        'Exit'
      ]
    }
  ]).then((res)=>{
    console.log(res.userChoice);
    switch(res.userChoice){
      case 'View all Employees':
        viewAllEmployees();
        break;
      case 'View Employees by Department':
        viewEmployeesByDepartment();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Remove Employee':
        removeEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Exit':
        connection.end();
        break;
      }

  }).catch((err)=>{
    if(err)throw err;
  });
}

function viewAllEmployees() {
  let query =
  `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role_title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, '', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON department.id = role.department_id
    LEFT JOIN employee manager
      ON manager.id = employee.manager_id`
    
    connection.query(query, (err, res)=>{
      if(err) throw err;
      console.table(res);
      firstPrompt();
    });
}

function viewEmployeesByDepartment(){
  let query =
  `SELECT
    department.id,
    department.name,
    role.salary
  FROM employee
  LEFT JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name, role.salary`;

  connection.query(query, (err, res)=>{
    if (err) throw err;
    const deptChoices = res.map((choices) => ({
      value: choices.id, name: choices.name
    }));
  console.table(res);
  getDept(deptChoices);
  });
}

