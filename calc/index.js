var s = "";
window.onload = function() {
	document.getElementById("1").onclick = function() {
		s = s+"1";
		document.getElementById("board").value = s;
	}
	document.getElementById("2").onclick = function() {
		s = s+"2";
		document.getElementById("board").value = s;
	}
	document.getElementById("3").onclick = function() {
		s = s+"3";
		document.getElementById("board").value = s;
	}
	document.getElementById("4").onclick = function() {
		s = s+"4";
		document.getElementById("board").value = s;
	}
	document.getElementById("5").onclick = function() {
		s = s+"5";
		document.getElementById("board").value = s;
	}
	document.getElementById("6").onclick = function() {
		s = s+"6";
		document.getElementById("board").value = s;
	}
	document.getElementById("7").onclick = function() {
		s = s+"7";
		document.getElementById("board").value = s;
	}
	document.getElementById("8").onclick = function() {
		s = s+"8";
		document.getElementById("board").value = s;
	}
	document.getElementById("9").onclick = function() {
		s = s+"9";
		document.getElementById("board").value = s;
	}
	document.getElementById("0").onclick = function() {
		s = s+"0";
		document.getElementById("board").value = s;
	}
	document.getElementById("/").onclick = function() {
		if (s[s.length-1] == '+' || s[s.length-1] == '-' || s[s.length-1] == '*' || s[s.length-1] == '/')
			s = s.substring(0, s.length-1);
		s = s+"/";
		document.getElementById("board").value = s;
	}
	document.getElementById("*").onclick = function() {
		if (s[s.length-1] == '+' || s[s.length-1] == '-' || s[s.length-1] == '*' || s[s.length-1] == '/')
			s = s.substring(0, s.length-1);
		s = s+"*";
		document.getElementById("board").value = s;
	}
	document.getElementById("-").onclick = function() {
		if (s[s.length-1] == '+' || s[s.length-1] == '-' || s[s.length-1] == '*' || s[s.length-1] == '/')
			s = s.substring(0, s.length-1);
		s = s+"-";
		document.getElementById("board").value = s;
	}
	document.getElementById("+").onclick = function() {
		if (s[s.length-1] == '+' || s[s.length-1] == '-' || s[s.length-1] == '*' || s[s.length-1] == '/')
			s = s.substring(0, s.length-1);
		s = s+"+";
		document.getElementById("board").value = s;
	}
	document.getElementById("dot").onclick = function() {
		s = s+".";
		document.getElementById("board").value = s;
	}
	document.getElementById("(").onclick = function() {
		s = s+"(";
		document.getElementById("board").value = s;
	}
	document.getElementById(")").onclick = function() {
		s = s+")";
		document.getElementById("board").value = s;
	}
	document.getElementById("C").onclick = function() {
		s = "";
		document.getElementById("board").value = s;
	}
	document.getElementById("=").onclick = function() {
		try{
			s = String(eval(s));
			document.getElementById("board").value = s;
		}
		catch(SyntaxError) {
			alert("illegal!")
		}
	}
	document.getElementById("lar").onclick = function() {
		s = s.substring(0, s.length-1);
		document.getElementById("board").value = s;
	}
};