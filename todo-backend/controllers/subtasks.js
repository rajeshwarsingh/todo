const db = require("../models");
const { subTasks, tasks } = db;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "title can not be empty!"
    });
    return;
  }

  if (!req.body.taskId) {
    res.status(400).send({
      message: "taskId can not be empty!"
    });
    return;
  }

  // Create a SubTask
  const subtask = {
    title: req.body.title,
    taskId: req.body.taskId
  };

  // Save SubTask in the database
  subTasks.create(subtask)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SubTask."
      });
    });
};

// Retrieve all SubTask from the database.
exports.findAll = (req, res) => {
  const id = req.params.id;
  const condition = { taskId: id }

  subTasks.findAll({
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
          err.message || "Some error occurred while retrieving subtask."
      });
    });
};

// Update a SubTask by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const status = req.body.status

  if (!status) {
    res.status(400).send({
      message: "taskId can not be empty!"
    });
    return;
  }

  subTasks.update({ Status: status }, {
    where: { subTaskId: id }
  })
    .then(num => {
      if (num == 1) {
        if (status === 'pending') {
          subTasks.findByPk(id)
            .then(data => {
              if (data) {
                tasks.update({ Status: status }, {
                  where: { taskId: data.taskId }
                })
                  .then(result => {
                    res.send({
                      message: "SubTask was updated successfully."
                    });
                  })
              } else {
                res.status(404).send({
                  message: `Cannot find SubTask with id=${id}.`
                });
              }
            })

        } else {
          res.send({
            message: "SubTask was updated successfully."
          });
        }
      } else {
        res.send({
          message: `Cannot update SubTask with id=${id}. Maybe SubTask was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SubTask with id=" + id + err
      });
    });
};