module.exports = function (mongoose) {
    var schemas = require('./schemas');

    return {
        goyGoy: mongoose.model('goyGoy',schemas.goyGoy, 'goyGoys'),
        tag: mongoose.model('tag',schemas.tag, 'tags'),

        modelWrapper:{ }
    };
};