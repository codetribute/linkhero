var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var goyGoyModel = models.goyGoy;
var url = require('url') ;
var helpers = require('../helper');
var moment = require('moment');

exports.getAll =function(req, res) {

    goyGoyModel.find({ _id: req.params.id }).exec( function (err, groups) {

        res.render('../views/group/list.ejs',{groups: groups});

    });
}

exports.dashboard =function(req, res) {

    goyGoyModel.find({}).exec( function (err, groups) {

        res.render('../views/group/list.ejs',{groups: groups});

    });

}
exports.pagination =function(req, res) {

    goyGoyModel.find({}).sort({ createDate: 'desc' }).skip(req.params.id*15).limit(15).exec( function (err, groups) {
        var outModel = helpers.checkErr(models,groups,err);
        res.json(outModel);

    });

}

exports.search =function(req, res) {
    var regex = new RegExp(req.params.id, 'i');

    goyGoyModel.find({ $or:[ {'title':regex}, {'tags':regex} ]}).sort({ date: 'desc' }).exec( function (err, groups) {
        var outModel = helpers.checkErr(models,groups,err);
        res.json(outModel)

    });

}

exports.viewCount =function(req, res) {
 console.log(req.params.id);
    goyGoyModel.findOne({_id:  req.params.id}).exec( function (err, goygoy) {
		
		if(goygoy.viewCount!=null)
		{
			goygoy.viewCount=goygoy.viewCount +1;
		}else{
			goygoy.viewCount=1;
		}
		
	
		goygoy.save(function (err,group) {
        var outModel = helpers.checkErr(models,group,err)
        res.json(outModel);
		});
		
    

    });

}

exports.create = function(req, res) {

    var group = new goyGoyModel();
    console.log(req.body.title)
    group.title = req.body.title;

     if(req.body.link.indexOf('youtube')>0)
    {
        group.source= "YOUTUBE.COM";
    }else  if(req.body.link.indexOf('onedio')>0)
    {
        group.source= "ONEDIO.COM";
    }else  if(req.body.link.indexOf('alkislarla')>0)
    {
        group.source= "ALKISLARLAYASIYORUM.COM";
    }else  if(req.body.link.indexOf('serinses')>0)
    {
        group.source= "SERINSESLER.COM";
    }else  if(req.body.link.indexOf('mynet')>0)
    {
        group.source= "MYNET.COM";
    }else  if(req.body.link.indexOf('vimeo')>0)
    {
        group.source= "VIMEO.COM";
    }else  if(req.body.link.indexOf('instagram')>0)
    {
        group.source= "INSTAGRAM.COM";
    }else  if(req.body.link.indexOf('facebook')>0)
    {
        group.source= "FACEBOOK.COM";
    }else  if(req.body.link.indexOf('issiz')>0)
    {
        group.source= "ISSIZADAM.COM";
    }else  if(req.body.link.indexOf('vine')>0)
    {
        group.source= "VINE.CO";
    }else 
    {
        group.source= "OTHER";
    }

    group.link= req.body.link;
    group.icon= req.body.icon;
    group.date = moment(new Date()).format("DD-MM-YYYY hh:mm");
    group.createDate =new Date();

    group.save(function (err,group) {
        var outModel = helpers.checkErr(models,group,err)
        res.json(outModel);
    });
}

exports.update = function(req, res) {

    goyGoyModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        if(!err){

            group.title = req.body.title;
            group.subTitle= req.body.link;
            group.color= req.body.icon;
            group.icon= req.body.icon;

            group.save(function (err,group) {

                var outModel = helpers.checkErr(models,group,err);
                res.json( outModel);
            })

        }else{
            models.modelWrapper.message = err;
        }
    });
}



exports.edit = function (req, res) {
    goyGoyModel.findOne({ _id: req.params.id }).exec( function (err, group) {

        if(!err){

            res.json({group:group,isSuccessfull:true});

        }else{
            res.json( {isSuccessfull:false} );
        }
    });
}

exports.delete = function (req, res) {
    goyGoyModel.findOne({ _id: req.params.id }).exec( function (err, group) {
        group.remove();

        var model = helpers.checkDataAndErr(models,group,err);

        if(model.isSuccessfull){
            /*group.remove();*/
            res.json(model);
        }else
            res.json(model);
    });
}
