// ==UserScript==
// @name           Github Syntax Highlighting Disabler
// @namespace      ui-fix
// @description    This script disables Github's obnoxious chromatic aberation.
// @include        https://github.com/*
// ==/UserScript==

function f() {
	var a = document.getElementsByClassName("highlight");
	for(var i=0; i < a.length; i++)
		a[i].className = "";
}

setInterval(f, 100);
