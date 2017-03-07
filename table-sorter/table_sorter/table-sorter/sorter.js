var a={todo:[-1,-1,-1], staff:[-1,-1,-1]};

function swap(ra, rb) {
	var temp = ra.innerHTML;
	ra.innerHTML = rb.innerHTML;
	rb.innerHTML = temp;
}

function sort(way, index, f) {
	for (var i = 1; i <= 3; i++)
		for (var j = i+1; j <= 3; j++) {
			if (way == 1 &&  f[j].cells[index].innerHTML < f[i].cells[index].innerHTML)
				swap(f[j], f[i]);
			if (way == -1 && f[j].cells[index].innerHTML > f[i].cells[index].innerHTML)
				swap(f[j], f[i]);
		}
}

function did(event) {
	var s = event.target.innerHTML;
	var id;
	if (s == "What?" || s == "When?" || s == "Location") id = "todo";
	else id = "staff";
	var f = document.getElementById(id).rows;
	var way;
	for (var t = 0; t < 3; t++) {
		if (f[0].cells[t].innerHTML == s) {
			a[id][t] = -a[id][t];
			sort(a[id][t], t, f);
			for (var tt = 0; tt < 3; tt++) if (tt != t)
				a[id][tt] = -1;
			break;
		}
	}
	$("#"+id+" th").attr("class", "normal");
	if (a[id][t]==1) event.target.className = "up";
	else event.target.className = "down";
}

window.onload = function() {
	$("th").click(did);
}