'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    chapter_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    chapter_name: DataTypes.STRING,
    course_id: DataTypes.INTEGER
  }, {});


  Chapter.associate = function(models) {
    Chapter.belongsTo(models['Course'], {
      foreignKey: 'course_id',
      as: 'course'
    });
  };

  return Chapter;
};
