outarea = false, st = false, en = false, left = false;
var block = ["block_1","block_2","block_3","block_4","block_5","block_6","block_7","block_8","block_9"];
var invalid=[];
window.onload = function() {
	invalid = document.getElementsByName("in");
	var message = document.getElementById("message");
	document.getElementById("start").onmouseover = function() {
		st = true; outarea = false; left = false;
		message.innerHTML="";
	}
	document.getElementById("end").onmouseover = function() {
		if (st) {
			if (outarea || !left) {
				message.innerHTML = "Don't cheat, you should start from 'S' and move to the 'E' inside the maze!";
			} else {
				message.innerHTML = "You Win!";
			}
		}
		st = false;
	}
	document.getElementById("check1").onmouseover = function() {
		outarea = true;
	}
	document.getElementById("check2").onmouseover = function() {
		left = true;
	}
	for (i = 0; i < 9; i++) {
		invalid[i].onmouseover = function() {
			if (!st) return;
			message.innerHTML = "You Lose!";
			st = false;
			this.setAttribute("class","red");
		}
	}
	for (i = 0; i < 9; i++) {
		invalid[i].onmouseout = function() {
			this.setAttribute("class","grey");
		}
	}

}