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

var d=[[0,1],[1,0],[0,-1],[-1,0]];
function st() {
	var x = 1, y = 1, nx, ny;
	while (1) {
		if ($("#pic-"+calc(x,y)).attr("class") == "pic16") break;
		y++;
		if (y >= 5) {
			x++; y = 1;
		}
	}
	for (var i = 1; i <= 10000; i++) {
		var k = (Math.round(Math.random()*100))%4;
		nx = x+d[k][0];
		ny = y+d[k][1];
		if (nx < 1 || nx > 4 || ny < 1 || ny > 4) continue;
		$("#pic-"+calc(x,y)).attr("class", $("#pic-"+calc(nx,ny)).attr("class"));
		$("#pic-"+calc(nx, ny)).attr("class", "pic16");
		x = nx; y = ny;
	}
}
	
function did() {
	var nx, ny, x, y;
	for (x = 1; x <= 4; x++) {
		for (y = 1; y <= 4; y++)
			if ("pic-"+calc(x, y) == this.id) break;
		if (y <= 4 && "pic-"+calc(x, y) == this.id) break;
	}
	for (var k = 0; k < 4; k++) {
		nx = x+d[k][0];
		ny = y+d[k][1];
		if (nx < 1 || nx > 4 || ny < 1 || ny > 4) continue;
		if ($("#pic-"+calc(nx, ny)).attr("class") == "pic16") {
			$("#pic-"+calc(nx, ny)).attr("class", $("#pic-"+calc(x, y)).attr("class"));
			$("#pic-"+calc(x, y)).attr("class", "pic16");
			break;
		}
	}
}

window.onload = function () {
	$("#start").click(st);
	$('div[id^="pic-"]').click(did);
}