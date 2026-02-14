const express = require('express')
const router = express.Router()
const {getAllTasks, createTask} = require('../controller/tasks')


router.route('/').get(getAllTasks).post(createTask)

module.exports = router



