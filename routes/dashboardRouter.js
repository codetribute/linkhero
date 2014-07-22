var dashboard = require('../controllers/dashboardController');

module.exports = function (app) {

    app.get('/', dashboard.dashboard);
    app.get('/adminDashboard', dashboard.adminDashboard);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();

        res.redirect('/login');
    }
}