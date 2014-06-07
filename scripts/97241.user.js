// ==UserScript==
// @name           internalUse.oa.sy
// @namespace      oa.commerce.sh.cn
// @include        http://oa.commerce.sh.cn/*
// ==/UserScript==

var uid = "sy", pwd = "sy";

window.F1 = function() {
	alert("LOADED");
};

window.F2 = function(msg) {
	var d, s;
	
	s = document.createElement("SPAN");
	s.style.fontFamily = "宋体";
	s.style.fontSize = "24pt";
	s.style.color = "#061860";
	s.appendChild(document.createTextNode(msg));	
	d = document.createElement("DIV");
	d.style.position = "absolute";
	d.style.left = "500px";
	d.style.top = "200px";
	d.appendChild(s);
	document.body.appendChild(d);
};

window.trim = function (str) {
		return str.replace(/^[ ]+/, "").replace(/[ ]+$/, "");
};


if (/SubModule\/login\/index.asp/.test(window.location.href)) {	// Login form
	document.getElementsByName("Username")[0].value = uid;
	document.getElementsByName("Password")[0].value = pwd;
	document.getElementsByName("Susan_Login")[0].submit();
}
else if (/SubModule\/index.asp/.test(window.location.href)) {	// Logged in
	var nav, main, f;
	
	nav = document.getElementById("navgator");
	main = document.getElementById("main");
	
	window.location.href = "http://oa.commerce.sh.cn/SubModule/checkatt2/index.asp?FunctionID=1,8,8";
}
else if (/SubModule\/checkatt2/.test(window.location.href)) {
	var f, n, obj, t1, t2, sb;
	f = document.getElementsByName("TimeCheck")[0];
	obj = document.getElementsByTagName("B");
	sb = document.getElementsByName("Submit")[0];
	t1 = trim(obj[1].firstChild.nodeValue.toString().replace("\r","").replace("\n","")).split(" ");
	t2 = t1[1].split(":");
	
	if (sb.value.charCodeAt(0)==19979) {
		if (Number(t2[0])<17 || Number(t2[0])==17 && Number(t2[1])<30) {
			F2("Too early...");
		}
		else {
			document.getElementsByName("username")[0].value = uid;
			document.getElementsByName("Password")[0].value = pwd;
			f.submit();
		}
	}
	else {
		if (Number(t2[0])>9) {
			F2("Late...");
		}
		else {
			document.getElementsByName("username")[0].value = uid;
			document.getElementsByName("Password")[0].value = pwd;
			f.submit();
		}
	}
}