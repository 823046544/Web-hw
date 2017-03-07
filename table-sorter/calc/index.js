var s = "";
window.onload = function() {
	$("#C").click(function() {
		s = "";
		display();
	});

	function display() {
		$("#board").val(s);
	}

	var digit=[];
	for (var i = 0; i <= 9; i++) digit.push(i);
	digit.push("left");
	digit.push("right");
	digit.push("dot");
	for (var i = 0; i <= 12; i++) {
		$("#"+digit[i]).click(function(event) {
			if (this.id != "0" || s.length != 0) {
				s = s+this.value;
				display();
			}
		});
	}

	var a=["add","dec","dis","mul"];
	for (var i = 0; i < 4; i++) {
		$("#"+a[i]).click(function() {
			if (isoperator())
				del();
			s = s+this.value;
			display();
		});
	}

	$("#lar").click(function() {
		del();
		display();
	});

	$("#equal").click(function() {
		try{
			s = String(eval(s));
			display();
		}
		catch(SyntaxError) {
			s = "";
			display();
			alert("illegal!")
		}
	});

	function isoperator() {
		for (var i = 0; i < 4; i++)
			if (s[s.length-1] == $("#"+a[i]).val()) return true;
		return false;
	}

	function del() {
		if (s.length >= 1) s = s.substring(0, s.length-1);
	}
};