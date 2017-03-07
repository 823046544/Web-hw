var bcrypt = require('bcrypt-nodejs');
//var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');

module.exports = function(db) {
	console.log('database was built');
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			return users.findOne({username:username}).then(function(user) {
				console.log(user);
				if (!user){
					console.log("no one")
                    return Promise.reject('用户不存在');
                }else {
    				var result = bcrypt.compareSync(password, user.password);
                    if (result){
						console.log(user);
						 return Promise.resolve(user);
    				}else return Promise.reject('用户名或密码错误');
                }
			});
		},
		checkUser: function(user) {
			console.log(user);
			var formatErrors = "";
			return new Promise(function(resolve, reject) {
				return (formatErrors.length > 0) ? reject(formatErrors) : resolve(user);
			}).then(function() {
				return users.findOne({username: user.username}//,{id: user.id},{phone: user.phone},    {email: user.email}
				).catch(function(err){
					console.log('infomation repeat');
					return Promise.reject('infomation repeat');
				}).then(function(){
						bcrypt.hash(user.password, '', function() {}, function(error, result) {
							user.password = result;
							users.insert(user);
							console.log('checkvaild' , user);
						});
						return Promise.resolve(user);
					});
			});
		}
	};
};
