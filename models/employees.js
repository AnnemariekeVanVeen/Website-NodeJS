'use strict';
module.exports = (sequelize, DataTypes) => {
    const employees = sequelize.define('employees', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        pin: DataTypes.STRING
    }, {});
    employees.associate = function (models) {
      // Tried to create a relation with employees, but unfortunately this kept failing

      // models.employees.belongsTo(models.reports, {
      //     foreignKey: id,
      //     targetKey: employeeId
      // })
    };
    return employees;
};