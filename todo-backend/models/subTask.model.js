module.exports = (sequelize, Sequelize) => {
  const SubTasks = sequelize.define("sub_tasks", {
    subTaskId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    taskId: {
      type: Sequelize.INTEGER
    },
    Status: {
      type: Sequelize.STRING,
      defaultValue: "pending"
    }
  });

  return SubTasks;
};