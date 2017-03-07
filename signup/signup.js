var http=require('http');
var fs=require('fs');
var url=require('url');
var queryString=require('querystring');
var user = [];
var params;

function begin() {

	fs.readFile("user.txt", 'utf-8', function(err, data) {
		var s = data.toString().split('\r\n');
		for (var i = 0; i < s.length-1; i++) {
			var c = s[i].split(',');
			user[i] = {};
			user[i]["name"] = c[0];
			user[i]["id"] = c[1];
			user[i]["phone"] = c[2];
			user[i]["email"] = c[3];
		}
	});

	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		var search = url.parse(request.url).search;
		var query = queryString.parse(url.parse(request.url).query);
		var _data = "";
		request.addListener("data", function (data) {
			_data += data;
		});

		request.addListener("end", function() {

			if (pathname == "/_signin") {
				var params = queryString.parse(_data);
				var temp = 1;
				if ((params["name"].length < 6) || (params["name"] > 18) || !(/^[a-zA-Z0-9_]{1,}$/.test(params["name"]))
					|| !(/^[a-zA-Z]$/.test(params["name"][0]) )) temp *= 2;
				if ((params["id"].length != 8) || !(/^[0-9]{1,}$/.test(params["id"])) || (params["id"][0] == '0')) temp *= 3;
				if (!(/^[0-9]{1,}$/.test(params["phone"])) || (params["phone"].length == 0) || (params["phone"][0] == '0')) temp *= 5;
				if (!(/^[a-zA-Z0-9_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(params["email"]))) temp *= 7;
			
				var find = 0;
				var index = 0;
				for (index = 0; index < user.length; index++)
					if ((params['name'] == user[index]['name']) && (params['id'] == user[index]['id']) && (params['phone'] == user[index]['phone']) && (params['email'] == user[index]['email'])) {
						find = 1; break;
					}
				if (find == 0) {
					if (temp == 1) {
						var d = params['name']+','+params['id']+','+params['phone']+','+params['email']+'\r\n';
						user[user.length] = [];
						user[user.length-1] = params;
						fs.appendFile("user.txt", d, function(err, data) {});
						response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
						response.write(s1+"用户详情"+s2+params['name']+s3+params['id']+s4+params['phone']+s5+params['email']+s6);
						response.end();
					} else {
						console.log("throw error");
						response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
						response.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"register.css\">");
						response.write("<p>error</p>");
						if (temp%2 == 0) response.write("<p>用户名有误,由6-8位大小写字母、下划线或数字组成，开头为字母</p>");
						if (temp%3 == 0) response.write("<p>学号有误，要求8位数字，开头不为0</p>");
						if (temp%5 == 0) response.write("<p>电话号码有误，只能包含数字，开头不为0</p>");
						if (temp%7 == 0) response.write("<p>邮箱有误</p>");
						response.end();
					}
				} else {
					response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
					response.write(s1+"用户已存在"+s2+params['name']+s3+params['id']+s4+params['phone']+s5+params['email']+s6);
					response.end();
				}
			}
		});

		if ((pathname != "/_signin") && (search == null)) {
			var suffix = pathname.substr(pathname.lastIndexOf('.')+1, pathname.length);
			if (suffix != 'css' && suffix != 'js') suffix = 'html';
			fs.readFile("register."+suffix, function(err, data) {
				console.log("load file "+"register."+suffix);
				response.writeHead(200, {"Content-Type":"text/"+suffix});
				response.write(data.toString());
				response.end();
			});
		}

		if ((pathname != "/_signin") && (search != null)) {
			console.log(pathname);
			console.log(search);
			console.log(query);
			find = 0;
			for (index = 0; index < user.length; index++)
				if ((query['username'] == user[index]['name'])) {
					find = 1; break;
				}
			if (find == 0) {
				fs.readFile("register.html", function(err, data) {
					console.log("load file "+"register.html");
					response.writeHead(200, {"Content-Type":"text/html"});
					response.write(data.toString());
					response.end();
				});
			} else {
				response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
				response.write(s1+"用户详情"+s2+user[index]['name']+s3+user[index]['id']+s4+user[index]['phone']+s5+user[index]['email']+s6);
				response.end();
			}
		}
	}).listen(8000);
	console.log("Server is running at 127.0.0.1:8000");
}

begin();

var s1 = "<!DOCTYPE><html><head><title>info</title><link rel=\"stylesheet\" type=\"text/css\" href=\"register.css\"><script type=\"text/javascript\" src=\"register.js\"></script></head><body><h1>"
var s2 = "</h1><div id=\"panel\"><table><tr><td>用户名：</td><td><input value=\""
var s3 = "\"></td></tr><tr><td>  学号：</td><td><input value=\"";
var s4 = "\"></td></tr><tr><td>  电话：</td><td><input value=\"";
var s5 = "\"></td></tr><tr><td>  邮箱：</td><td><input value=\"";
var s6 = "\"></td></tr></table></div></body></html>";