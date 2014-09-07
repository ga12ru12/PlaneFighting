/**
 * Created by quang.hoang on 26/08/2014.
 */
var mongoose        = require('mongoose');
var EventEmitter    = require("events").EventEmitter;
var util            = require("util");
var crypto          = require('crypto');
var _               = require('underscore');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    password: String,
    nickName: String,
    address : String,
    geo     : {
        type: [Number],
        index: '2d'
    },
    win     : Number,
    lose    : Number
});

var UserModel = mongoose.model('user', UserSchema, 'user');

function User(param, callback){
    EventEmitter.call(this);
    if(param){
        new UserModel(param).save(function(err){
            if(err){
                return callback(false, err);
            }else{
                return callback(true);
            }
        });
    }
}
util.inherits(User, EventEmitter);

User.prototype = {
    checkUserLogin: function(username, password, callback){
        var self = this;
        UserModel.findOne({username: username, password: password}, function(err, result) {
            if(err) {
                console.log(err);
                return callback(false, err);
            } else {
                if(result == null) {
                    return callback(true,'Login failed');
                } else {
                    self = _.extend(self, result);
                    return callback(true);
                }
            }
        });
    }
}

module.exports = {
    User: User
}