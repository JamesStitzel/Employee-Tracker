const Employee = require('./Employee');
const Manager = require('./Manager');
const Department = require('./Department');

Employee.hasOne(Manager, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

Manager.belongsTo(Employee, {
  foreignKey: 'employee_id',
});

Employee.hasMany(Department, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

Department.belongsTo(Employee, {
  foreignKey: 'employee_id',
});

module.exports = { Employee, Manager, Department };
