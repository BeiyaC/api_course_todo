const express = require('express');
const router = express.Router();
const typeRepository = require('../repository/type');
const handleErrors = require('../core/utils')

router.post('/', async (req, res) => {
    try {
        const type = await typeRepository.createType(req.body);
        res.status(201).json(type);
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const type = await typeRepository.getTypeById(req.params.id);
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ error: 'Type not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.get('/', async (req, res) => {
    const { limit = 50, offset = 0, ...filters } = req.query;
    try {
        const types = await typeRepository.getAllTypes(parseInt(limit), parseInt(offset), filters);
        res.json(types);
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const type = await typeRepository.updateType(req.params.id, req.body);
        if (type) {
            res.json(type);
        } else {
            res.status(404).json({ error: 'Type not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await typeRepository.deleteType(req.params.id);
        if (result) {
            res.json({message: 'This type was successfully deleted', type: result});
        } else {
            res.status(404).json({ error: 'Type not found' });
        }
    } catch (error) {
        await handleErrors.repository(error, res)
    }
});

module.exports = router;