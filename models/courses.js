'use strict';
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        course_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {});

    Course.associate = function(models) {
        Course.hasMany(models['Chapter'], {
            foreignKey: 'course_id',
            as: 'chapters'
        });
    };
    return Course;
};
