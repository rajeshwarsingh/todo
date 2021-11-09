const Sequelize = require("sequelize");

const config = {
    DBUser: process.env.DBUser,
    DBPassword: process.env.DBPassword,
    DBHost: process.env.DBHost,
    DBPort: process.env.DBPort,
    DBName: process.env.DBName
}

const URL = `postgres://${config.DBUser}:${config.DBPassword}@${config.DBHost}:${config.DBPort}/${config.DBName}`;
const sequelize = new Sequelize(URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.subTasks = require("./subTask.model.js")(sequelize, Sequelize);

module.exports = db;