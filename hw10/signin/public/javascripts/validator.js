
$(function(){
	$("#clear").click(function(){//重置
		$("input[type='text']").val("");
	});

	$("form").submit(function(){
		clearError();
		if(!isValid()) return false;
		return true;
	});

	function isValid(){ //校验信息
		var isvalid = true;
		var name = $("input[name='username']").val();
		var schoolid = $("input[name='id']").val();
		var phone = $("input[name='phone']").val();
		var email = $("input[name='email']").val();
		var fpassword = $("input[name='password']").val();
		var spassword = $("input[name='rpassword']").val();
		if (name.length < 6 || name.length > 18 || /^[A-z]+[A-z0-9_]+/.test(name) == false) {
			throwError("用户名需要6~18位英文字母、数字或下划线，且必须以英文字母开头");
			isvalid = false;
		}
		if (fpassword.length < 6 || fpassword.length > 12 || /^[A-z_\-]+[A-z_\-]$/.test(fpassword)) {
			throwError("密码需要6~12位数字、大小写字母、中划线、下划线");
			isvalid = false;
		}
		if (fpassword != spassword) {
			throwError("密码前后不一致");
			isvalid = false;
		}
		if (schoolid.length != 8 || /^[1-9]+[0-9]$/.test(schoolid) == false) {
			throwError("学号需要8位数字，且不能以0开头");
			isvalid = false;
		}
		if (phone.length != 11 || /^[1-9]+[0-9]$/.test(phone) == false) {
			throwError("电话需要11位数字，且不能以0开头");
			isvalid = false;
		}
		if (email.length == 0 || /^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(email) == false) {
			throwError("邮箱输入有误");
			isvalid = false;
		}
		return isvalid;
	}

	function throwError(error){//提示错误
		$("#errormessage").html($("#errormessage").html()+"<li>"+error+"</li>");
	}

	function clearError(){//清空之前错误信息
		$("#errormessage").html("");
		$("#registeinforepeat").html("");
	}
});
