exports.ConStr = function(app){
    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
            "hostname":"ds061208.mongolab.com",
            "port":61208,
            "username":"goygoy",
            "password":"goygoygoygoy",
            "name":"",
            "db":"goygoy"
        }
    }
    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');
        if(obj.username && obj.password){
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
        else{
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }
    var mongourl = generate_mongo_url(mongo);
    return mongourl;

}