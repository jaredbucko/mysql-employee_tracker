const mysql = require("mysql");
const inquirer =require('inquirer');
const method = require('./js/queryFunctions');

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
  runApp();
});

function runApp() {
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "Welcome! What would you like to do?",
    choices: [
      "Create new department",
      "Create new role",
      "Create new employee",
      "View all departments",
      "View all roles",
      "View all employees",
      "Update employee",
      "Delete department",
      "Delete employee",
      "Exit"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
    case "Create new department":
      method.createDepartment();
      break;

    case "Create new role":
      method.createRole();
      break;

    case "Create new employee":
      method.createEmployee();
      break;

    case "View all departments":
      method.viewDepartments();
      break;

    case "View all roles":
      method.viewRoles();
      break;

    case "View all employees":
      method.viewEmployees();
      break;

    case "Update employee":
      method.updateEmployee();
      break;

    case "Delete department":
      method.deleteDepartment();
      break;

    case "Delete employee":
    method.deleteEmployee();
    break;

    case "Exit":
      method.quitApp();
      break;

    }
  });
};

exports.runApp = runApp;
