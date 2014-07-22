var group = require('../controllers/goygoyController');

module.exports = function (app) {

    app.get('/groups', group.dashboard);
    app.post('/goygoy/create', group.create);
    app.get('/goygoy/edit/:id', group.edit);
    app.put('/goygoy/update/:id', group.update);
    app.delete('/goygoy/:id', group.delete);
    app.get('/goygoy/list', group.getAll);
    app.get('/goygoy/search/:id', group.search);
	app.get('/goygoy/view/:id', group.viewCount);
    app.get('/goygoy/page/:id', group.pagination);

}