const getAllJobs = async (req, res) => {
    res.send('HELLO WORLD!!!')
}

const getJob = async (req, res) => {
    res.send('Get the latest job')
}

const createJob = async (req, res) => {
    res.send('Get the latest job')
}

const updateJob = async (req, res) => {
    res.send('Get the latest job')
}

const deleteJob = async (req, res) => {
    res.send('Get the latest job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}