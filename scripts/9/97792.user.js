// ==UserScript==
// @name          Always show console
// @include       http://api.stackoverflow.com/*/usage/*
// @version       1.0
// @namespace     http://www.isimonbrown.co.uk/alwaysshowconsole
// ==/UserScript==

work = function() {
	showConsole();
}

// Inspired by this post: http://meta.stackoverflow.com/questions/46562
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + work + ")();";
document.body.appendChild(script);