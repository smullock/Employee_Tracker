//Dependencies
const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'GhfYsmullocktr4234',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

startPrompt();

function startPrompt(){
  inquirer.prompt([
      {
          type: 'list',
          name: 'option',
          message: 'What would you like to do?',
          choices: [
                      'View all Departments',
                      'View all Roles',
                      'View all Employees',
                      'add a Department',
                      'add a role',
                      'add an employee',
                      'update an employee role'
                  ]
      }
  ]) .then (response => {
      switch (response.option) {
          case 'View all Departments':
              viewAllDepartments ();
              break;
          case 'View all Roles':
              viewAllRoles();
              break;
          case 'View all Employees':
              viewAllEmployees();
              break;
          case 'add a Department':
              addADepartment();
              break;
          case 'add a role':
              addARole();
              break;
          case 'add an employee':
              AddAnEmployee();
              break;
          case 'update an employee role':
              updateEmployeeRole();
              break;
          
      }
  })
}

// View all Departments
function viewAllDepartments(){
  db.query ("SELECT * FROM department ORDER BY id;",
  function(err, res) {
    if (err) throw err
    console.table(res)
   startPrompt()
})
}

//View all Roles
function viewAllRoles(){
  db.query ("SELECT * FROM role;",
  function(err, res) {
    if (err) throw err
    console.table(res)
   startPrompt()
})
}


//View all Employees
function viewAllEmployees(){
  db.query("SELECT employee.first_name, employee.last_name, role.title, department.department_name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;",
  function(err, res) {
    if (err) throw err
    console.table(res)
   startPrompt()
})
}

//add a department to menu
function addADepartment(){
    inquirer.prompt([
      {
        name: "department_name",
        type: "input",
        message: "What department do you want to add?"
      }
    ]).then(function(res) {
      db.query("INSERT INTO department SET  ?",{
        department_name: res.department_name
       },
        function(err, res) {
        if (err) throw err
        console.table("Department added")

        startPrompt()
})
}
    )
}


// add a role to menu
function addARole(){

  db.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
    let departments = res.map(department => ({
      name: department.department_name, 
      value: department.department_id
    })
    );

      inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of the role?"
    },

    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?"
    },

    {
      type: 'input', 
      name: 'depart_name',
      message: "What department does the role belong to?",
      choices: departments
    },
  ]) .then ((response) => {
    db.query("INSERT INTO role SET  ?",
    {
      title: response.title,
      salary: response.salary,
      department_id: response.departments,
  },

  (err, res) => {
    if (err) throw err;
    console.table(`\n ${response.title} added to database! \n`);
   startPrompt();
})
})
  })
};

//add a new employee
function AddAnEmployee ()  {
  db.query(`SELECT * FROM role;`, (err, res) => {
      if (err) throw err;
      let roles = res.map(role => ({name: role.title, value: role.role_id }));
      db.query(`SELECT * FROM employee;`, (err, res) => {
          if (err) throw err;
          let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
          inquirer.prompt([
              {
                  name: 'firstName',
                  type: 'input',
                  message: 'What is the new employee\'s first name?'
              },
              {
                  name: 'lastName',
                  type: 'input',
                  message: 'What is the new employee\'s last name?'
              },
              {
                  name: 'role',
                  type: 'list',
                  message: 'What is the new employee\'s title?',
                  choices: roles
              },
              {
                  name: 'manager',
                  type: 'list',
                  message: 'Who is the new employee\'s manager?',
                  choices: employees
              }
          ]).then((response) => {
              db.query(`INSERT INTO employee SET ?`, 
              {
                  first_name: response.firstName,
                  last_name: response.lastName,
                  role_id: response.role,
                  manager_id: response.manager,
              }, 
              (err, res) => {
                  if (err) throw err;
              })
              db.query(`INSERT INTO role SET ?`, 
              {
                  department_id: response.departments,
              }, 
              (err, res) => {
                  if (err) throw err;
                  console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                  startPrompt();
              })
          })
      })
  })
};

//update employee role
function updateEmployeeRole(){
  db.query(`SELECT * FROM role;`, (err, res) => {
      if (err) throw err;
      let roles = res.map(role => ({name: role.title, value: role.role_id }));
      db.query(`SELECT * FROM employee;`, (err, res) => {
          if (err) throw err;
          let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
          inquirer.prompt([
              {
                  name: 'employee',
                  type: 'list',
                  message: 'Which employee would you like to update the role for?',
                  choices: employees
              },
              {
                  name: 'newRole',
                  type: 'list',
                  message: 'What should the employees new role be?',
                  choices: roles
              },
          ]).then((response) => {
              db.query(`UPDATE employee SET ? WHERE ?`, 
              [
                  {
                      role_id: response.newRole,
                  },
                  {
                      id: response.employee,
                  },
              ], 
              (err, res) => {
                  if (err) throw err;
                  console.table(`\n Successfully updated employee's role in the database! \n`);
                  startPrompt();
              })
          })
      })
  })
}






// function updateEmployeeRole(){
//   db.query("SELECT employee.first_name, employee.last_name, role.title, department.department_name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;",
//   function(err, res) {
//     if (err) throw err
//     console.table(res)
//    startPrompt()
// })
// }