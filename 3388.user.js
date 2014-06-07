// ==UserScript==
// @name	Clickable Fotolog Users
// @description	Converts /users into clickable links
// @namespace	http://skreuzer.f2o.org/code/greasemonkey/fotolog
// @author	Steven Kreuzer
// @include	http://*.fotolog.com*
// @version	0.1
// ==/UserScript==

function clickable()
{
	var node = document.getElementById('caption');
	var domain = window.location.host;
	if (node) {
		var re = new RegExp("\/(\\w+)", "gi");
		node.innerHTML= node.innerHTML.replace(re, "<a href=\"http://" + domain + "/$1\">/$1</a>");
	}
}


window.addEventListener("load", function() { clickable() }, true);

