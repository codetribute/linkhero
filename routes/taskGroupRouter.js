var group = require('../controllers/taskGroupController');

module.exports = function (app) {

    app.get('/taskgroup', group.dashboard);
    app.post('/taskgroup/create', group.create);
    app.get('/taskgroup/edit/:id', group.edit);
    app.put('/taskgroup/update/:id', group.update);
    app.delete('/taskgroup/:id', group.delete);
    app.get('/taskgroup/list', group.getAll);
    app.get('/taskgroup/affectedList/:id', group.affectedList);

}