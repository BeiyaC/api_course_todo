
async function repositoryErrors(error, res){
    if (error.message === 'TITLE_ERROR') {
        res.status(400).json({ error: 'Invalid title' });
    } else if (error.message === 'DESCRIPTION_ERROR') {
        res.status(400).json({ error: 'Invalid description' });
    } else if (error.message === 'DATE_ERROR') {
        res.status(400).json({ error: 'Invalid due date' });
    } else if (error.message === 'TYPE_ERROR') {
        res.status(400).json({ error: 'Invalid type ID' });
    } else if (error.message === 'NAME_ERROR') {
        res.status(400).json({ error: 'Invalid name' });
    } else {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    repository: repositoryErrors
}