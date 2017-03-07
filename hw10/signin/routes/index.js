var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');
var url = require('url');
var queryString=require('querystring');

module.exports = function(db) {
	console.log('routes was running');
	var usercontroller = require('../modules/usercontroller')(db);
	router.get('/detail', function(req, res, next) {
		if (!req.session.user) {
			res.redirect('/signin');
		} else res.render('detail', {title:'详情', user:req.session.user});
	});

	router.get('/signin', function(req, res, next) {
		res.render('signin', {title:'登录', user:{},e:''});
	});

	router.post('/signin', function(req, res, next) {
		usercontroller.findUser(req.body.username, req.body.password)
			.then(function(user){
				req.session.user = user;
				res.redirect('/detail');
			}).catch(function(error){
				console.log(req.body, error);
				res.render('signin', {title:'登录', user:req.body, e:error});
			});
	});

	router.get('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
	});

	router.get('/regist', function(req, res, next) {
		res.render('regist', {title:'注册',user:{}});
	});
	router.post('/regist', function(req, res, next) {
		var user = req.body;
		console.log(user);
		usercontroller.checkUser(user).catch(function(error){
			console.log('repeat');
			res.render('regist', {title: '注册', user: user, e:'注册信息重复',error: error.message});
		}).then(function(user){
				console.log(user);
				req.session.user = user;
				res.redirect('detail');
			});
	});
	router.all('*', function(req, res, next) {
		var query = queryString.parse(url.parse(req.url).query);
		console.log(req.session.user);
		if (req.session.user) {
			if (query['username'] != req.body.username) res.render('detail', {title:'详情', user:req.session.user, e:'只能够访问自己的数据'});
			else next();
		} else res.redirect('/signin');
	});
	return router;
};
