const { Type } = require('../models');

async function createType(attributes) {
    const { name } = attributes
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
        throw new Error('NAME_ERROR');
    }
    return await Type.create(attributes);
}

async function getTypeById(id) {
    return await Type.findByPk(id);
}

async function getAllTypes(limit, offset, filters) {
    return await Type.findAll({
        where: filters,
        limit: limit,
        offset: offset
    });
}

async function updateType(id, attributes) {
    const type = await Type.findByPk(id);
    if (type) {
        return await type.update(attributes);
    }
    return null;
}

async function deleteType(id) {
    const type = await Type.findByPk(id);
    if (type) {
        await type.destroy();
        return type;
    }
    return null;
}

module.exports = {
    createType,
    getTypeById,
    getAllTypes,
    updateType,
    deleteType
};