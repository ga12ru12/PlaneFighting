/**
 * Created by quang.hoang on 26/08/2014.
 */
var express = require('express');
var router = express.Router();
var Room = require('../models/room').Room;

router.get('/', function(req, res){
    var room = new Room();
    room.getAllRoom(function(status, rooms){
        if(status){
            res.render('index', {rooms: rooms});
        }else{
            req.session.err = 'Have error in Database. Please come back later!!!!';
            res.render('index');
        }
    });
});
router.get('/createRoom', function(req, res){
    res.render('index');
});
router.post('/createRoom', function(req, res){
    var room = new Room();
    room.createNewRoom(req.body.name, req.body.password, req.body.host, req.body.description, function(status){
        if(status){
            req.session.success = 'Create new room successfully';
            res.redirect('/game/room?id='+room._id);
        }else{
            req.session.err = 'Have a error in Database. Please try later!!!!';
            res.redirect('/game/');
        }
    });
});
router.get('/room', function(req, res){
    var id = req.param('id');
    var room = new Room();
    room.getRoomById(id, function(){
        console.log(room);
        res.render('index', {room: room});
    });
});
module.exports = router;