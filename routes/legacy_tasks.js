const express = require('express');
const router = express.Router();
const task_repository = require('../repository/task');

router.get('/', async (req, res) => {
    const { limit = 50, offset = 0, ...filters } = req.query;
    let tasks;

    try {
        if (Object.keys(filters).length) {
            tasks = await task_repository.getTaskBySearch(filters, parseInt(limit), parseInt(offset));
        } else {
            tasks = await task_repository.getTasks(parseInt(limit), parseInt(offset));
        }

        if (!tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(tasks);
    } catch (ex) {
        console.error(ex);
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await task_repository.getTaskById(id);
        if (!task.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (ex) {
        console.error(ex);
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, due_date, type_id } = req.body;

    try {
        const result = await task_repository.createTask({ title, description, due_date, type_id });
        res.status(201).json({ id: result.insertId, title, description, due_date, type_id });
    } catch (ex) {
        console.error(ex);
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
});

module.exports = router;