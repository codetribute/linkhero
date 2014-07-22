var mongoose = require('mongoose');
var models = require('../models/models')(mongoose);
var tagModel = models.tag;
var url = require('url') ;
var helpers = require('../helper');



exports.index =function(req, res) {

    tagModel.find({}).exec( function (err, tag) {

        if(tag.length>0){
            console.log('data var')
        }else{
            var tag = new tagModel();

            tag.dayCalorie = 1244;
            tag.weekCalorie = 7888;
            tag.monthCalorie = 19789;

            tag.save(function (err,tag) {
            });
        }

        res.render('../views/tag/setting.ejs',{tags: tag});
    });
}






















exports.update = function(req, res) {

    settingModel.findOne({ _id: req.body.id }).exec( function (err, setting) {

        if(!err){

            setting.dayCalorie = req.body.dayCalorie;
            setting.weekCalorie = req.body.weekCalorie;
            setting.monthCalorie = req.body.monthCalorie;

            setting.save(function (err,setting) {
                var outModel = helpers.checkErr(models,setting,err);
                console.log(setting)
                res.redirect('/setting');
            })

        }else{
            models.modelWrapper.message = err;
            res.json({})
        }
    });

}