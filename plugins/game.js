var debug = require("debug")("UserFacts");
var _ = require("lodash");




exports.firstVisit = function(bool,cb) {


    var memory = this.user.memory;
    var userId = this.user.id;
    var key = 'firstVisitX';

    memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
        if (_.isEmpty(res)) {
            memory.db.put({subject:key, predicate: userId, object: true}, function(){
                cb(null, (bool == "true") ? true : false)
            });
        } else {
            cb(null, (bool == "false") ? true : false)
        }
    });


};



exports.getFavoriteTeam = function(cb) {


    var memory = this.user.memory;
    var userId = this.user.id;
    var key = 'team';


    memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
        if (!_.isEmpty(res)) {
          cb(null, res[0].object)

        } else {
            cb(null, "");
        }
    });

};



exports.hasItem = function(key, bool, cb) {

    var memory = this.user.memory;
    var userId = this.user.id;

    memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
        console.log("Memory for ", key, bool, res);
        if (!_.isEmpty(res)) {
            cb(null, (bool == "true") ? true : false)
        } else {
            cb(null, (bool == "false") ? true : false)
        }
    });
};


exports.save = function(key, value, cb) {
    var memory = this.user.memory;
    var userId = this.user.id;

    console.log("SAVE DATA", key, value);

    memory.db.get({subject:key, predicate: userId }, function(err, results) {
        if (!_.isEmpty(results)) {
            memory.db.del(results[0], function(){
                memory.db.put({subject:key, predicate: userId, object: value}, function(){
                    cb(null,"");
                });
            });
        } else {
            memory.db.put({subject:key, predicate: userId, object: value}, function(err){
                cb(null, "");
            });
        }
    });

};

/// Global
exports.checkForPlural = function(cb) {


    var raw_words = this.message.raw.split(" ");
    // check for plural ...

    var plural = false;

    if (raw_words.indexOf("games") >-1 || raw_words.indexOf("games")>-1){
        var plural = true;
    }


    if (plural) {
        this.message.containsPlural = true;
    } else {
        this.message.containsPlural = false;
    }

    cb(null, "");
};


exports.isPlural = function(bool,cb) {

    var plural = this.message.containsPlural;

    if (plural) {
        cb(null, (bool == "true") ? true : false)

    } else {
        cb(null, (bool == "false") ? true : false)
    }



};