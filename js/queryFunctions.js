const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const server = require('../server');

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

module.exports = {
  createDepartment: function() {
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
          server.runApp();
        });
      });
  },
  
  createRole: function() {
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
          server.runApp();
        });
      });
  },
  
  createEmployee: function() {
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
          type: "number",
          message: "What is the id# of this employee's manager? (Leave blank if null)"
        }
      ])
      .then(function(answer) {
        let manager_id = answer.manager_id;
        if (!answer.manager_id) {
          manager_id = null;
        };
        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, [answer.first_name, answer.last_name, answer.role_id, manager_id], function(err, res) {
          console.log("New employee added to database.");
          server.runApp();
        });
      });
  },
  
  viewDepartments: function() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      console.table(res);
      server.runApp();
    });
  },
  
  viewRoles: function() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      console.table(res);
      server.runApp();
    });
  },
  
  viewEmployees: function() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      console.table(res);
      server.runApp();
    });
  },
  
  updateEmployeeRole: function() {
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
          type: "number",
          message: "What is the id# of their new role?"
        }
      ])
      .then(function(answer) {
        var query = "UPDATE employee SET role_id=? WHERE (first_name=? AND last_name=?)";
        connection.query(query, [answer.role, answer.first_name, answer.last_name], function(err, res) {
          console.table("Role updated!");
          server.runApp();
          });
      });
  },

  updateEmployeeManager: function() {
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
          name: "manager_id",
          type: "number",
          message: "What is the id# of their new manager? (Leave blank if null)"
        }
      ])
      .then(function(answer) {
        let manager_id = answer.manager_id;
        if (!answer.manager_id) {
          manager_id = null;
        };
        var query = "UPDATE employee SET manager_id=? WHERE (first_name=? AND last_name=?)";
        connection.query(query, [manager_id, answer.first_name, answer.last_name], function(err, res) {
          console.table("Manager updated!");
          server.runApp();
          });
      });
  },

  deleteDepartment: function() {
    inquirer
      .prompt([
        {
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to delete?"
        }
      ])
      .then(function(answer) {
        var query = "DELETE FROM department WHERE (name=?)";
        connection.query(query, [answer.name], function(err, res) {
          console.table("Department deleted.");
          server.runApp();
          });
      });
  },

  deleteRole: function() {
    inquirer
      .prompt([
        {
        name: "name",
        type: "input",
        message: "What is the name of the role you would like to delete?"
        }
      ])
      .then(function(answer) {
        var query = "DELETE FROM role WHERE (name=?)";
        connection.query(query, [answer.name], function(err, res) {
          console.table("Role deleted");
          server.runApp();
          });
      });
  },

  deleteEmployee: function() {
    inquirer
      .prompt([
        {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you would like to delete?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the last name of the employee you would like to delete?"
        }
      ])
      .then(function(answer) {
        var query = "DELETE FROM employee WHERE (first_name=? AND last_name=?)";
        connection.query(query, [answer.first_name, answer.last_name], function(err, res) {
          console.table("Employee deleted.");
          server.runApp();
          });
      });
  },

  quitApp: function() {
    connection.end();
    process.exit();
  }
};
