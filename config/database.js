exports.ConStr = function(app){
    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
            "hostname":"ds033599.mongolab.com",
            "port":33599,
            "username":"linkhero",
            "password":"147258369",
            "name":"",
            "db":"linkhero"
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
