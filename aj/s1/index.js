var flag = {A:false, B:false, C:false, D:false, E:false};
var count = 0;

function getNum() {
	var target = event.target.className.split(" ")[0];
	if (flag[target] || $("."+target).css("background-color") == "rgb(128, 128, 128)") return;
	tar = target;
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
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener('click', getNum);
	$("#info-bar").click(getSum);
	$("#botton").mouseleave(clean);
}