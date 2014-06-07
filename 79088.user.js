// ==UserScript==
// @name           auto take feedback
// @namespace      zz
// @description    cho tien
// @include        http://ap.fpt.edu.vn/*
// ==/UserScript==

function fill() {
	for (i = 1;i<=5;i++) {
		var radio = document.getElementsByName('Q'+i)[0];
		radio.checked = true;
	}
	document.getElementsByName("comment")[0].innerHTML = 'zzz';
	document.getElementsByName('submit')[0].click();	
	window.location = "http://ap.fpt.edu.vn/feedback/index.php";
}

fill();