var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var noteMarkModel = models.noteMark;
var url = require('url') ;
var helpers = require('../helper');

exports.getAll =function(req, res) {

    noteMarkModel.find({ group: req.params.id }).exec( function (err, noteMarks) {

        res.render('../views/noteMark/list.ejs',{noteMarks: noteMarks,groupId:req.params.id});

    });
}

exports.getAllArchive =function(req, res) {

    noteMarkModel.find({ group: req.params.id }).exec( function (err, noteMarks) {

        res.render('../views/noteMark/list.ejs',{noteMarks: noteMarks,groupId:req.params.id});

    });
}
exports.create = function(req, res) {

    var noteMark = new noteMarkModel();

    noteMark.title = req.body.title;
    noteMark.subTitle= req.body.subTitle;
    noteMark.color= req.body.color;
    noteMark.content = req.body.content;
    noteMark.group = req.body.group;
    noteMark.tag = req.body.tag;
    noteMark.isLock = false;
    noteMark.save(function (err,noteMark) {
        var outModel = helpers.checkErr(models,noteMark,err)
        res.json(outModel);
    });
}

exports.edit = function (req, res) {
    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, noteMark) {

        if(!err){

            res.json({noteMark:noteMark,isSuccessfull:true});

        }else{
            res.json( {isSuccessfull:false} );
        }
    });
}

exports.update = function(req, res) {

    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

        if(!err){

            notemark.title = req.body.title;
            notemark.subTitle = req.body.subTitle;
            notemark.color = req.body.color;
            notemark.content = req.body.content;
            notemark.group = req.body.group;

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
    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

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
    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, noteMark) {
        console.log(noteMark)
        res.render('../views/noteMark/detail.ejs',noteMark);

    });
}

exports.test = function (req, res) {
  res.render('../views/noteMark/test.ejs');
}

exports.lock = function(req, res) {

    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

        if(!err){
            notemark.isLock =  req.body.isLock;

            notemark.save(function (err,notemark) {

                var outModel = helpers.checkErr(models,notemark,err);
                res.json( outModel);
            })

        }else{
            models.modelWrapper.message = err;
        }
    });
}


exports.archive = function(req, res) {

    noteMarkModel.findOne({ _id: req.params.id }).exec( function (err, notemark) {

        if(!err){
            notemark.isArchive =  req.body.isArchive;

            notemark.save(function (err,notemark) {

                var outModel = helpers.checkErr(models,notemark,err);
                res.json( outModel);
            })

        }else{
            models.modelWrapper.message = err;
        }
    });
}