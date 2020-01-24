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
  runApp();
});

function runApp() {
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
      "Update employee"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
    case "Create new department":
      createDepartment();
      break;

    case "Create new role":
      createRole();
      break;

    case "Create new employee":
      createEmployee();
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

    case "Update employee":
      updateEmployee();
      break;
    }
  });
};

function createDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department you would like to add?"
    })
    .then(function(answer) {
      const query = "INSERT INTO department (name) VALUES (?)";
      const newDepartment = answer.department;
      connection.query(query, [newDepartment], function(err, res) {
        console.log("New department added to database.");
        runApp();
      });
    });
};

function createRole() {
  inquirer
    .prompt([
      {
      name: "role",
      type: "input",
      message: "What is the name of the role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the starting salary for this role?"
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id for this role?"
      }
    ])
    .then(function(answer) {
      const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answer.role, answer.salary, answer.department_id], function(err, res) {
        console.log("New role added to database.");
        runApp();
      });
    });
};

function createEmployee() {
  inquirer
    .prompt([
      {
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is last name of the employee you would like to add?"
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id for this employee?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the id of this employee's manager?"
      }
    ])
    .then(function(answer) {
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
        console.log("New employee added to database.");
        runApp();
      });
    });
};

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    console.table(res);
    runApp();
  });
};

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    console.table(res);
    runApp();
  });
};

function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    console.table(res);
    runApp();
  });
};

function updateEmployee() {
  inquirer
    .prompt([
      {
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee you would like to update?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you would like to update?"
      },
      {
        name: "role",
        type: "input",
        message: "What is the id for their new role?"
      }
    ])
    .then(function(answer) {
      var query = "UPDATE employee SET role_id=? WHERE (first_name=? AND last_name=?)";
      connection.query(query, [answer.role, answer.first_name, answer.last_name], function(err, res) {
        console.table("Role updated!");
        runApp();
        });
    });
};
