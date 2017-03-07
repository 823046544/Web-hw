window.onload = function () {
	$("#reset").click(function () {
		var f=["name","id","email","phone"];
		for (var i = 0; i < 4; i++) $("#"+f[i]).val("");
	});
}