const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const mysql = require("mysql");
const db = require("./db");
const { title } = require("process");
require("console.table");

init();

function init() {
    const logoText = logo({ name: "Employee Tracker"}).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    inquirer.prompt([
        {
        type: "list",
        title: "choice",
        message: "What would you like to do?",
        choices: [
            {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
            },
            {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            },
            {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
            },
            {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
            },
            {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
            },
            {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
            },
            {
            name: "View All Roles",
            value: "VIEW_ALL_ROLES"
            },
            {
            name: "Add Role",
            value: "ADD_ROLE"
            },
            {
            name: "Remove Role",
            value: "REMOVE_ROLE"
            },
            {
            name: "View All Departments",
            value: "VIEW_ALL_DEPARTMENTS"
            },
            {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
            },
            {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENTS"
            },
            {
            name: "View Total Utilized Budget By Department",
            value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
            },
            {
            name: "Quit",
            value: "QUIT"
            }
        ]
    }
])

.then(res => {
    let choice = res.choice;

    switch (choice) {
        case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
        case "ADD_EMPLOYEE":
        addEmployee();
        break;
        case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
        case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
        case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
        case "VIEW_ALL_ROLES":
        viewAllRoles();
        break;
        case "ADD_ROLE":
        addRole();
        break;
        case "REMOVE_ROLE":
        removeRole();
        break;
        case "VIEW_ALL_DEPARTMENTS":
        viewAllDepartments();
        break;
        case "ADD_DEPARTMENT":
        addDepartment();
        break;
        case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
        case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
        default:
        quit();
        }
    }
    )

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        options();
    })
};

function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        options();
                    })
                })
        })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                options();
                })
            })
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

function updateRole() {

};

function deleteEmployee() {

};

function exitApp() {
    connection.end();
};

}