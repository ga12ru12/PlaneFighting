/**
 * Created by quang.hoang on 26/08/2014.
 */
var mongoose = require('mongoose');
var EventEmitter    = require("events").EventEmitter;
var util            = require("util");
var _               = require('underscore');

var RoomSchema = mongoose.Schema({
    name        : String,
    password    : Number,
    description : String,
    host        : String,
    player      : String,
    createTime  : {
        type    : Date,
        default : Date.now()
    },
    status      : {
        type    : Boolean,
        default : true
    },
    isFinished      : {
        type    : Boolean,
        default : false
    }
});

var RoomModel = mongoose.model('room', RoomSchema, 'room');

function Room(){
    EventEmitter.call(this);
}
util.inherits(Room, EventEmitter);

Room.prototype = {
    createNewRoom: function(name, password, host, description, callback){
        var self = this;
        new RoomModel({
            name        : name,
            password    : password,
            host        : host,
            description : description
        }).save(function(err, doc){
                if(err){
                    console.log('Create new room failure: name-'+name+', host-'+host);
                    console.log(err);
                    return callback(false);
                }else{
                    self = _.extend(self, doc);
                    return callback(true);
                }
            });
    },
    getAllRoom: function(callback){
        RoomModel.find(function(err, rooms, count){
            if(err){
                console.log(err);
                return callback(false);
            }else{
                return callback(true, rooms, count);
            }
        });
    },
    getRoomById: function(id, callback){
        var self = this;
        RoomModel.findById(id, function(err, doc){
            if(err){
                console.log('Get room By Id fail: id-'+id);
                console.log(err);
                return callback(false);
            }else{
                console.log(doc);
                self = _.extend(self, doc);
                return callback(true, doc);
            }
        });
    }
}

module.exports = {
    Room: Room
}