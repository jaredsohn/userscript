// ==UserScript==
// @name           Lepro %username% Replacer
// @author         UnDetected
// @description    Раз %username%, пусть им буду Я
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function() {
	var b = document.getElementById('greetings').innerHTML;
	var u = b.match(/<a href="(http:\/\/.*?)\/users\/(.*)">(.*)<\/a>(.*)/i)[2];
	doit(document.getElementsByClassName('dt'));
	function doit(e) {
		for(i=0;i<e.length;i++) {
			e[i].innerHTML = e[i].innerHTML.replace(/%username%/gi, "<span style='color:#ff661c;'>" + u + "</span>");
		}
	}
	// If DOM changed
	document.addEventListener("DOMNodeInserted", dc, false);	
	function dc(e) {
		if(e.target.className.indexOf("post") > -1) doit(e.target.getElementsByClassName('dt'));
	}
})();