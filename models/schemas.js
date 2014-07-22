var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    goyGoy: new Schema({
        title: {
            type: String,
            required:true
        },
        link: {
            type: String,
            required:false
        },
        icon: {
            type: String,
            required:false
        },
        date: {type: String},
        source: {
            type: String,
            required:false
        },
        createDate: {type: Date},
		viewCount:{ type: Number, default: 0 }

    }),
    tag: new Schema({
        title: {
            type: String,
            required:true
        }
    })
};
