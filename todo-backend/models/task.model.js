module.exports = (sequelize, Sequelize) => {
    const Tasks = sequelize.define("tasks", {
        taskId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        Status: {
            type: Sequelize.STRING,
            defaultValue: "pending"
        }
    });

    return Tasks;
};