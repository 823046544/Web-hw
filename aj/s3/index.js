var flag = {A:false, B:false, C:false, D:false, E:false};
var count = 0;

function getNum(target, callback) {
	var tar = target;
	if (tar == 'F') {
		getSum();
		return;
	}
	$(".button").css({"background-color":"gray"});
	$("."+tar+" .unread").show();
	$("."+tar+" .unread").html("");
	$.get("rand_num"+tar, function(data, status) {
		count = count+parseInt(data);
		$("."+tar+" .unread").html(data);
		flag[tar] = true;
		if (tar == 'E') getSum();
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
		for (var key in flag) getNum(key);
	});	
	$("#botton").mouseleave(clean);
}