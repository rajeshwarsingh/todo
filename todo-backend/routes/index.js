const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('use /tasks and /subtasks route');
});

module.exports = router;
