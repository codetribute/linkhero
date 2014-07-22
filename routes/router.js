
var accountRouter = require('../routes/accountRouter');
var goygoyRouter = require('../routes/goygoyRouter');
var taskGroupRouter = require('../routes/taskGroupRouter');
var dashboardRouter = require('../routes/dashboardRouter');
var tagRouter= require('../routes/tagRouter');
var noteMarkRouter= require('../routes/noteMarkRouter');
var taskRouter= require('../routes/taskRouter');
module.exports = function (app, passport) {

    accountRouter(app,passport);
    goygoyRouter(app);
    taskGroupRouter(app);
    dashboardRouter(app);
    tagRouter(app);
    noteMarkRouter(app);
    taskRouter(app);
};
