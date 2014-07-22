var task = require('../controllers/taskController');

module.exports = function (app) {

    app.get('/task/list/:id', task.getAll);
    app.get('/task/detail/:id', task.detail);
    app.post('/task/create', task.create);
    app.get('/task/edit/:id', task.edit);
    app.put('/task/update/:id', task.update);
    app.delete('/task/:id', task.delete);
}


