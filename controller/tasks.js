

// router.get('/', getAllTasks)


const getAllTasks = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Data Fetched!!!'
    })
}

const createTask = (req, res) => {
    res.status(201).json({
        success: true,
        message: 'Task Created!!!'
    })
}

module.exports = {
    getAllTasks,
    createTask
}

