var noteMark = require('../controllers/noteMarkController');

module.exports = function (app) {

    app.get('/noteMark/list/:id', noteMark.getAll);
    app.get('/noteMark/detail/:id', noteMark.detail);
    app.post('/noteMark/create', noteMark.create);
    app.get('/noteMark/edit/:id', noteMark.edit);
    app.put('/noteMark/update/:id', noteMark.update);
    app.delete('/noteMark/:id', noteMark.delete);
    app.put('/noteMark/lock/:id', noteMark.lock);
    app.put('/noteMark/unLock/:id', noteMark.lock);
    app.put('/noteMark/archive/:id', noteMark.archive);
    app.put('/noteMark/unArchive/:id', noteMark.archive);
    app.get('/noteMark/test/', noteMark.test);

}


