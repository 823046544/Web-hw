var flag = {A:false, B:false, C:false, D:false, E:false};
var count = 0;

function getNum(target, step) {
	var tar = target;
	if (tar == 'F') {
		getSum();
		return;
	}
	$(".button:not(."+tar+")").css({"background-color":"gray"});
	$("."+tar+" .unread").show();
	$("."+tar+" .unread").html("");
	$.get("rand_num", function(data, status) {
		count = count+parseInt(data);
		$("."+tar+" .unread").html(data);
		flag[tar] = true;
		$("."+tar).css({"background-color":"gray"});
		for (var key in flag)
			if (flag[key] == false) {
				$("."+key).css({"background-color":"#303F9F"});
			}
		if (step == 5) {
			getSum();
		} else while (1) {
			var temp = getRandomNumber(5)%5;
			var c = String.fromCharCode(65+temp);
			if (flag[c] == false) {
				getNum(c, step+1);
				return;
			} else continue;
		}
	});
}

function getRandomNumber(limit) {
	return Math.round(Math.random()*limit);
}

function getSum() {
	for (var key in flag) if (flag[key] == false) return false;
	$(".sum").html(count);
}

function clean() {
	for (var key in flag) {
		$("."+key).css({"background-color":"#303F9F"});
		flag[key] = false;
	}
	count = 0;
	$(".unread").hide();
	$(".sum").html("");
}

window.onload = function() {
	$(".unread").hide();
	$("#botton").click(function() {
		getNum(String.fromCharCode(65+getRandomNumber(5)%5), 1);
	});	
	$("#botton").mouseleave(clean);
}