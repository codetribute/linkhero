var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var taskGroupModel = models.taskGroup;
var url = require('url') ;
var helpers = require('../helper');

exports.getAll =function(req, res) {

    taskGroupModel.find({ _id: req.params.id }).exec( function (err, taskGroups) {

        res.render('../views/taskGroup/list.ejs',{taskGroups: taskGroups});

    });
}

exports.dashboard =function(req, res) {

    taskGroupModel.find({}).exec( function (err, taskGroups) {

        res.render('../views/taskGroup/list.ejs',{taskGroups: taskGroups});

    });

}

exports.create = function(req, res) {

    var group = new taskGroupModel();

    group.title = req.body.title;
    group.subTitle= req.body.subTitle;
    group.color= req.body.color;

    group.save(function (err,group) {
        var outModel = helpers.checkErr(models,group,err)
        res.json(outModel);
    });
}

exports.update = function(req, res) {

    taskGroupModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        if(!err){

            group.title = req.body.title;
            group.subTitle = req.body.subTitle;
			group.color = req.body.color;	
            group.save(function (err,group) {

                var outModel = helpers.checkErr(models,group,err);
                res.json( outModel);
            })

        }else{
            models.modelWrapper.message = err;
        }
    });
}

exports.affectedList = function (req, res) {

    taskGroupModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        if(!err){

            res.render('../views/taskGroup/affectedList.ejs',{group:group});

        }else{
            res.render('../views/taskGroup/affectedList.ejs',{});
        }
    });


}
exports.edit = function (req, res) {
    taskGroupModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        if(!err){

            res.json({group:group,isSuccessfull:true});

        }else{
            res.json( {isSuccessfull:false} );
        }
    });
}

exports.delete = function (req, res) {
    taskGroupModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        var model = helpers.checkDataAndErr(models,group,err);

        if(model.isSuccessfull){
            group.remove();
            res.json(model);
        }else
            res.json(model);
    });
}