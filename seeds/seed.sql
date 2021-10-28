const sequelize = require('../config/connection');
const { Employee, License, Department } = require('../models');

const employeeSeedData = require('./EmployeeSeedData.json');
const departmentSeedData = require('./MangerSeedData.json');
const departmentSeedData = require('./DepartmentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const employees = await Employee.bulkCreate(employeeSeedData);
  const managers = await Manager.bulkCreate(managerSeedData);

  for (const { id } of employees) {
    const newLicense = await role.create({
      employee_id: id,
    });
  }

  for (const department of departmentSeedData) {
    const newDepartment = await Department.create({
      ...department,
      employee_id: employees[Math.floor(Math.random() * employees.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
