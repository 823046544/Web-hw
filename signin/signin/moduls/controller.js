var debug = require('debug')('signin:user');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(name, password) {
			return users.findOne({name:name}).then(function(user) {
				console.log(user);
				if (!user){
					console.log("no one")
                    return Promise.reject('用户不存在');
                } else {
                    if (password == user.password){
						console.log(user);
						return Promise.resolve(user);
    				}else return Promise.reject('用户名或密码错误');
                }
			});
		}
	};
};
