var express = require('express');
var router = express.Router();

var users = {};

/* GET detail page. */
router.get('/signup', function(req, res, next) {
	res.render('signup', { title: '注册' });
});

router.post('/signup', function(req, res, next) {
	var user = req.body;
	console.log(user);
	req.session.user = users[user.username] = user;
	res.redirect('/detail');
});


router.get('/detail', function(req, res, next) {
	res.render('detail', { title: '详情', user: req.session.user});
});

router.all('*', function(req, res, next) {
	req.session.user ? next() : res.redirect('/signup');
});

module.exports = router;
