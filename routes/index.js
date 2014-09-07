var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var crypto          = require('crypto');

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
                console.log(user);
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

module.exports = router;
