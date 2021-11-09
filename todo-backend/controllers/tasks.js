const db = require("../models");
const { tasks, subTasks } = db;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {

  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Task
  const task = {
    title: req.body.title
  };

  // Save Task in the database
  tasks.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  tasks.findAll({
    where: condition, order: [
      ['title', 'ASC']
    ]

  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Task."
      });
    });
};


// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.status) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  tasks.update({ Status: req.body.status }, {
    where: { taskId: id }
  })
    .then(num => {
      if (num == 1) {
        subTasks.update({ Status: req.body.status }, {
          where: { taskId: id }
        })
          .then(result => {
            res.send({
              message: "Todo task was updated successfully."
            });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating todo task with id=" + id
            });
          })

      } else {
        res.send({
          message: `Cannot update todo task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating todo task with id=" + id
      });
    });
};