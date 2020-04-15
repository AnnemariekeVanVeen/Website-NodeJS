'use strict';
module.exports = (sequelize, DataTypes) => {
    const reports = sequelize.define('reports', {
        type: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        location: DataTypes.STRING,
        reporterName: DataTypes.STRING,
        reporterPhoneNumber: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER,
    }, {});
    reports.associate = function (models) {
        // Tried to create a relation with employees, but unfortunately this kept failing

        // models.reports.hasMany(models.employees, {
        // });
    };
    return reports;
};