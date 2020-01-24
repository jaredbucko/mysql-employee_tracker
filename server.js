const mysql = require("mysql");
const inquirer =require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gobruins2020",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  startApp();
});

function startApp() {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "Welcome! What would you like to do?",
    choices: [
      "Create new department",
      "Create new role",
      "Create new employee",
      "View all departments",
      "View all roles",
      "View all employees",
      "Update employee roles"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
    case "Create new department":
      createDepartment();
      break;

    case "Create new role":
      // createRole();
      break;

    case "Create new employee":
      // createEmployee();
      break;

    case "View all departments":
      viewDepartments();
      break;

    case "View all roles":
      viewRoles();
      break;

    case "View all employees":
    viewEmployees();
    break;
    }
  });
};

function createDepartment() {

}

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    console.table(res);
    startApp();
  });
};

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    console.table(res);
    startApp();
  });
};

function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    console.table(res);
    startApp();
  });
};


