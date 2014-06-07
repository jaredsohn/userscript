// ==UserScript==
// @name	Userscripts.org Syntax Highlighting Disabler
// @namespace	ui-fix
// @description	This scripts disables chromatic aberration on Userscript.org's "Source Code" tab.
// @include	http://userscripts.org/scripts/review/*
// @run-at	document-start
// @version	2
// ==/UserScript==

function f() {
	var a = document.getElementById("source").childNodes;
	for(var i=0; i < a.length; i++)
		a[i].className = "";
}

document.addEventListener("readystatechange", function () {
	f();
	if(document.readyState == "complete") {
		setTimeout(f, 0);
		setTimeout(f, 10);
		setTimeout(f, 100);
	}
});
