const express = require('express');
const router = express.Router();
const taskRepository = require('../repository/task');
const handleErrors = require('../core/utils')

router.post('/', async (req, res) => {
    try {
        const task = await taskRepository.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await taskRepository.getTaskById(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.get('/', async (req, res) => {
    const { limit = 50, offset = 0, ...filters } = req.query;
    try {
        const tasks = await taskRepository.getAllTasks(parseInt(limit), parseInt(offset), filters);
        res.json(tasks);
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await taskRepository.updateTask(req.params.id, req.body);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const success = await taskRepository.deleteTask(req.params.id);
        if (success) {
            res.json({message: 'This task was successfully deleted', task: success});
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

module.exports = router;