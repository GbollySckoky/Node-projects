const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async (req, res) => {
     const tasks = await Task.find({})
        res.status(200).json({
            status: "Success",
            data: tasks,
            nbHits: tasks.length
        })
    // try{
    //     const tasks = await Task.find({})
    //     res.status(200).json({
    //         // success: true,
    //         status: "Success",
    //         data: tasks,
    //         nbHits: tasks.length
    //     })
    // }
    // catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //     })
    // }
})

const createTask = asyncWrapper(async (req, res) => {
     const task = new Task(req.body)
        await task.save()
        res.status(201).json({
            success: true,
            message: 'Task Created!!!'
        })
    // try{
    //     const task = new Task(req.body)
    //     await task.save()
    //     res.status(201).json({
    //         success: true,
    //         message: 'Task Created!!!'
    //     })
    // }
    // catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //     })
    // }
    // const task = new Task(req.body)
    // await task.save()
    // res.status(201).json({
    //     success: true,
    //     message: 'Task Created!!!'
    // })
    //   res.status(201).json({ task })
})

const getTasksId = asyncWrapper(async (req, res) => {
      const {id: taskID} = req.params
        const task = await Task.findById({_id: taskID})
        if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
            res.status(200).json({
            success: true,
            data: task
        })
    // try{
    //     const {id: taskID} = req.params
    //     const task = await Task.findById({_id: taskID})
    //     if(!task){
    //         return res.status(404).json({
    //             success: false,
    //             message: `No task with id : ${taskID}`
    //         })
    //     }
    //         res.status(200).json({
    //         success: true,
    //         tasks: task
    //     })
    // }catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //     })
    // }
    
})

const deleteTask = asyncWrapper(async (req, res) => {
           const {id: taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
        res.status(200).json({
            success: true,
            data: task
        })
    // try{
    //     const {id: taskId} = req.params
    //     const task = await Task.findOneAndDelete({_id: taskId})
    //     if(!task){
    //         res.status(404)
    //         .json({
    //             success: false,
    //             message: `No task with id : ${taskId}`
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         tasks: task
    //     })
    // }catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //         })
    //     }
})

const updateTask = asyncWrapper(async (req, res) => {
       const {id: taskId} = req.params
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true
        })
         if (!task) {
            return next(createCustomError(`No task with id : ${taskId}`, 404))
          }
        res.status(200).json({
            success: true,
            data: task
        })
    // try{
    //     const {id: taskId} = req.params
    //     const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
    //         new: true,
    //         runValidators: true
    //     })
    //     if(!task){
    //         res.status(404)
    //         .json({
    //             success: false,
    //             message: `No task with id : ${taskId}`
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         tasks: task
    //     })
    // }catch(error){
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //         })
    // }
})

module.exports = {
    getAllTasks,
    createTask,
    getTasksId,
    deleteTask,
    updateTask
}

