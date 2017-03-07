window.onload = function () {
	var squares=[], pic_class=[];
	var dx=[-1,0,0,1], dy=[0,1,-1,0], finish = 1;
	var condition = document.getElementById("condition");
	var empty = document.getElementsByClassName("pic16");

	for (var i = 1; i <= 16; i++)
		squares[i] = document.getElementById("pic-"+i);
	for (var i = 1; i <= 16; i++)
		pic_class[i] = document.getElementsByClassName("pic"+i)[0];

	function calc(x, y) {
		return (x-1)*4+y;
	}

	function check_finish() {
		var flag = true;
		for (var i = 1; i <= 16; i++)
			if (pic_class[i].className != "pic"+i) {
				flag = false;
			}
		return flag;
	}

	document.getElementById("start").onclick = function() {
		condition.textContent = "Playing";
		finish = 0;
		var x = 1, y = 1, nx, ny;
		while (1) {
			if (pic_class[calc(x, y)].className == "pic16") break;
			y++;
			if (y >= 5) {
				x++; y = 1;
			}
		}
		for (var i = 1; i <= 10000; i++) {
			nx = x; ny = y;
			var dir = Math.round(Math.random())%2;
			var ret = Math.round(Math.random())%2;
			if (dir == 0) {
				if (ret == 0) nx++;
				else nx--;
			} else {
				if (ret == 0) ny++;
				else ny--;
			}
			if (nx < 1 || nx > 4 || ny < 1 || ny > 4) continue;
			num1 = parseInt(pic_class[calc(x,y)].className.substring(3, pic_class[calc(x, y)].className.length));
			num2 = parseInt(pic_class[calc(nx, ny)].className.substring(3, pic_class[calc(nx, ny)].className.length));
			pic_class[calc(x, y)].setAttribute("class", "pic"+num2);
			pic_class[calc(nx, ny)].setAttribute("class", "pic"+num1);
			x = nx; y = ny;
		}
	}
	for (var i = 1; i <= 16; i++) {
		squares[i].onclick = function() {
			if (finish == 1) return;
			var x = 1, y = 1, nx, ny;
			while (1) {
				if (pic_class[calc(x, y)].className == this.className) break;
				y++;
				if (y >= 5) {
					x++; y = 1;
				}
			}
			var flag = false;
			for (var k = 0; k < 4; k++) {
				nx = x+dx[k];
				ny = y+dy[k];
				if (nx < 1 || nx > 4 || ny < 1 || ny > 4) continue;
				if (pic_class[calc(nx, ny)].className == "pic16") {
					flag = true; break;
				}
			}
			if (!flag) return;
			num1 = parseInt(pic_class[calc(x,y)].className.substring(3, pic_class[calc(x, y)].className.length));
			num2 = parseInt(pic_class[calc(nx, ny)].className.substring(3, pic_class[calc(nx, ny)].className.length));
			pic_class[calc(x, y)].setAttribute("class", "pic"+num2);
			pic_class[calc(nx, ny)].setAttribute("class", "pic"+num1);

			if (check_finish()) {
				finish = 1;
				condition.textContent = "You win!";
			}
		}
	}
}