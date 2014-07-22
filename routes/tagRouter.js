var setting = require('../controllers/tagController');

module.exports = function (app) {
    app.get('/setting', setting.index);
    app.post('/setting/save', setting.update);
}