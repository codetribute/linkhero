var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var groupModel = models.group;
var noteMarkModel = models.noteMark;
var taskModel = models.task;
var taskGroupModel = models.taskGroup;
var url = require('url') ;
var helpers = require('../helper');

var goyGoyModel = models.goyGoy;

exports.dashboard =function(req, res) {

goyGoyModel.find().sort({ createDate: 'desc' }).limit(15).exec( function (err, groups) {

        var count=0;
        goyGoyModel.count({}, function(err, c)
        {
            var cc=c/15;
            var model=[];
            for(var i=0;i<=cc;i++){
                model[i]={};
                model[i]={
                    title:i+1,
                    skip:i
                }
            };


            res.render('../views/dashboard/index.ejs',{groups: groups,pagination:model});
        });


    });
}


exports.adminDashboard =function(req, res) {

    goyGoyModel.find().sort({ date: 'desc' }).exec( function (err, groups) {

        res.render('../views/dashboard/adminIndex.ejs',{groups: groups});

    });
}