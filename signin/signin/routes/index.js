var express = require('express');
var router = express.Router();

var debug = require('debug')('signin:index');

module.exports = function(db) {
	/* GET detail page. */
	console.log("index normal");
	var users = db.collection('users');
	var controller = require('../moduls/controller')(db);
	//debug("users collection", users);

	router.get('/signup', function(req, res, next) {
		res.render('signup', { title: '注册' , user: {}, errormessage: ""});
	});

	router.post('/signup', function(req, res, next) {
		var user = req.body;
		console.log("Checking");
		var errorval = 1;
		if ((user.name.length < 6) || (user.name.length > 8) || !(/^[a-zA-Z0-9_]{1,}$/.test(user.name))
			|| !(/^[a-zA-Z]$/.test(user.name[0]))) errorval *= 2;
		if ((user.id.length != 8) || !(/^[0-9]{1,}$/.test(user.id)) || (user.id[0] == '0')) errorval *= 3;
		if (!(/^[0-9]{1,}$/.test(user.phone)) || (user.phone.length == 0) || (user.phone[0] == '0')) errorval *= 5;
		if (!(/^[a-zA-Z0-9_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(user.email))) errorval *= 7;
		if ((user.password.length < 6 || user.password.length > 12) || !(/^[a-zA-Z0-9_]{1,}$/.test(user.name))) errorval *= 11;
		if (user.password != user.repassword) errorval *= 13;
		users.findOne({name:user.name}).then(function(user) {
			if (user) {
				console.log("Found One");
				errorval *= 17;
			}
			console.log("errorval: "+errorval);
			if (errorval == 1) {
				console.log("Inserting");
				users.insert(req.body);
				console.log("Insert complete");
				req.session.user = users[req.body.name] = req.body;
				console.log("jumping to detail");
				res.redirect('/detail');
			} else {
				var errormessage = "";
				if (errorval%2 == 0) errormessage += "用户名有误,由6-8位大小写字母、下划线或数字组成，开头为字母;";
				if (errorval%11 == 0) errormessage += "密码有误,由6~12位数字、大小写字母、中划线、下划线组成;";
				if (errorval%13 == 0) errormessage += "两次输入密码不相同<;";
				if (errorval%3 == 0) errormessage += "学号有误,由8位数字组成，开头不能为0;";
				if (errorval%5 == 0) errormessage += "电话号码有误,由11位数字组成，开头不能为0;";
				if (errorval%7 == 0) errormessage += "邮箱格式有误;";
				if (errorval%17 == 0) errormessage += "用户已存在;";
				console.log(errormessage);
				res.render('signup', {title:"注册", user: req.body, errormessage: errormessage});
			}

		});

		
	});

	router.get('/signin', function(req, res, next) {
		delete req.session.user;
		res.render('signin', { title: '登录', user:{}, errormessage:"" });
	});

	router.post('/signin', function(req, res, next) {
		var user = req.body;
		console.log(user);
		controller.findUser(user.name, user.password)
			.then(function(user) {
				console.log("In siginin has findUser");
				console.log(user);
				req.session.user = user;
				res.redirect('/detail');
			}).catch(function(error) {
				console.log("Catch error");
				console.log(error);
				res.render('signin', {title:'登录', user:req.body, errormessage:error});
			})

	});

	router.get('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
	})


	router.get('/detail', function(req, res, next) {
		console.log("In detail with user", req.session.user);
		res.render('detail', { title: '详情', user: req.session.user});
	});

	router.all('*', function(req, res, next) {
		console.log(req.session.user);
		req.session.user ? next() : res.redirect('/signin');
	});
	return router;

};