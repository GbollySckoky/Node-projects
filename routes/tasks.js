const express = require('express')
const router = express.Router()
const { getAllTasks, createTask, getTasksId, deleteTask, updateTask } = require('../controller/tasks')


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTasksId).delete(deleteTask).patch(updateTask)

module.exports = router



