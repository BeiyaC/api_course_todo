const { Task, Type } = require('../models');
const typeRepository = require('../repository/type');
const {Op} = require("sequelize");


async function createTask(attributes) {
    const { title, description, dueDate, typeId } = attributes;


    if (!title || typeof title !== 'string' || title.length < 3 || title.length > 50) {
        throw new Error('TITLE_ERROR');
    }
    if (!description || typeof description !== 'string' || description.length < 5 || description.length > 255) {
        throw new Error('DESCRIPTION_ERROR');
    }

    if (!dueDate || isNaN(Date.parse(dueDate)) || Date.parse(dueDate) < Date.now() + 24 * 60 * 60 * 1000) {
        throw new Error('DATE_ERROR');
    }
    if (!Number.isInteger(typeId)) {
        const result = await typeRepository.getTypeById(typeId)
        if(!result){
            throw new Error('TYPE_ERROR');
        }
    }

    return await Task.create(attributes);
}

async function getTaskById(id) {
    return await Task.findByPk(id);
}

async function getAllTasks(limit, offset, isLate, filters) {
    let whereQuery = filters
    if(isLate){
        whereQuery = {
            ...filters,
            dueDate: {
                [Op.lt]: new Date()
            }
        }
    }
    const tasks = await Task.findAll({
        where: whereQuery,
        limit: limit,
        offset: offset,
        include: {
            model: Type
        }
    });
    return tasks
}

async function updateTask(id, attributes) {
    const task = await Task.findByPk(id);
    if (task) {
        return await task.update(attributes);
    }
    return null;
}

async function deleteTask(id) {
    const task = await Task.findByPk(id);
    if (task) {
        await task.destroy();
        return task;
    }
    return null;
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask
};