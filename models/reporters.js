'use strict';
module.exports = (sequelize, DataTypes) => {
  const reporters = sequelize.define('reporters', {
    innt: DataTypes.INTEGER
  }, {});
  reporters.associate = function(models) {
    // associations can be defined here
  };
  return reporters;
};