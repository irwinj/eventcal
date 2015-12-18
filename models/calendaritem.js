'use strict';
module.exports = function(sequelize, DataTypes) {
  var calendaritem = sequelize.define('calendaritem', {
    title: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return calendaritem;
};