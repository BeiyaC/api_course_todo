const sql = require('../core/db');

const get_all_query = 'SELECT * FROM task LIMIT ? OFFSET ?';
const get_by_query = 'SELECT * FROM task WHERE ';
const get_by_id_query = 'SELECT * FROM task WHERE id = ?';
const create_task_query = `INSERT INTO task (title, description, due_date, type_id) VALUES (?, ?, ?, ?)`;

async function getTaskById(id) {
    const values = [id];
    const result = await sql.query({ sql: get_by_id_query, values });
    return result;
}

async function getTaskBySearch(filters, limit, offset) {
    let query = get_by_query;
    const values = [];
    const conditions = [];

    for (const [field, value] of Object.entries(filters)) {
        conditions.push(`${field} LIKE ?`);
        values.push(`%${value}%`);
    }

    query += conditions.join(' AND ') + ' LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const result = await sql.query({ sql: query, values });
    return result;
}

async function getTasks(limit, offset) {
    const values = [limit, offset];
    const result = await sql.query({ sql: get_all_query, values });
    return result;
}

async function createTask(attributes) {
    const { title, description, due_date, type_id } = attributes;
    const values = [title, description, due_date, type_id];
    const result = await sql.query({ sql: create_task_query, values });
    return result;
}

module.exports = {
    getTasks,
    getTaskById,
    getTaskBySearch,
    createTask
};