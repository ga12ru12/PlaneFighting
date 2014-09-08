var express     = require('express');
var router      = express.Router();
var crypto      = require('crypto');
var async       = require('async');

var User        = require('../models/user').User;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
    res.render('index');
});

router.post('/login', function(req, res) {
    var user = new User();
    user.checkUserLogin(req.body.username, crypto.createHash('sha1').update(req.body.password).digest('hex'), function(status, err){
        if(status){
            if(err){
                req.session.err = 'Username and password wrong. Please try again!';
                res.redirect('/login');
            }else{
                req.session.user = user;
                req.session.success = 'Login successfully. GLHF!!!!';
                res.redirect('/game');
            }
        }else{
            req.session.err = 'Database have error. Please try later!';
            res.redirect('/login');
        }
    });
});

router.get('/signup', function(req, res){
    res.render('signup');
});

router.post('/signup', function(req, res){
    if(req.body.username && req.body.email && req.body.password){
        async.parallel([
            function(cb){
                new User().checkUserNameExist(req.body.username, function(status){
                    cb(null, status);
                });
            }, function(cb){
                new User().checkEmailExist(req.body.email, function(status){
                    cb(null, status);
                });
            }
        ], function(err, result){
            if(result.indexOf(-1)){
                req.session.err = ""
            }else{

            }
        });
    }else{
        res.session.err = "Please fill out the Signup form";
        res.redirect('/signup');
    }
});

module.exports = router;
