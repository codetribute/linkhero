var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var taskModel = models.task;
var url = require('url') ;
var helpers = require('../helper');

exports.getAll =function(req, res) {

    taskModel.find({ taskGroup: req.params.id }).exec( function (err, noteMarks) {

        res.render('../views/task/list.ejs',{noteMarks: noteMarks,groupId:req.params.id});

    });
}

exports.create = function(req, res) {

    var task = new taskModel();

    task.title = req.body.title;
    console.log(req.body.color)

    task.note= req.body.note;
    task.color= req.body.color;
    task.endDate = req.body.endDate;
    task.taskGroup = req.body.taskGroup;
   /* task.tag = req.body.tag;
    task.priority = req.body.priority;*/

    task.isCompleted=false;

    console.log(task);
    task.save(function (err,task) {
        var outModel = helpers.checkErr(models,task,err)
        res.json(outModel);
    });
}

exports.edit = function (req, res) {
        taskModel.findOne({ _id: req.params.id }).exec( function (err, noteMark) {

            if(!err){

                res.json({noteMark:noteMark,isSuccessfull:true});

            }else{
                res.json( {isSuccessfull:false} );
            }
        });
    }

exports.update = function(req, res) {

    taskModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

        if(!err){

            notemark.title = req.body.title;
            notemark.note= req.body.note;
            notemark.color= req.body.color;
            notemark.endDate = req.body.endDate;
            notemark.group = req.body.group;
            notemark.tag = req.body.tag;

            notemark.save(function (err,notemark) {

                var outModel = helpers.checkErr(models,notemark,err);
                res.json( outModel);
            })

        }else{
            models.modelWrapper.message = err;
        }
    });
}

exports.delete = function (req, res) {
    taskModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

        var model = helpers.checkDataAndErr(models,notemark,err);

        if(model.isSuccessfull){
            notemark.remove();
            res.json(model);
        }else
            res.json(model);
    });
}

exports.detail = function (req, res) {

    console.log(req.params.id );
    taskModel.findOne({ _id: req.params.id }).exec( function (err, noteMark) {
   
        res.render('../views/task/detail.ejs',noteMark);

    });
}


