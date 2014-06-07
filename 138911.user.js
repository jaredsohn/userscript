// ==UserScript==
// @name        Geekhack Point and Click PM
// @namespace   Geekhack.org
// @description Redirects username links to send the user a new pm
// @include     http*://geekhack.org/*
// @version     1
// ==/UserScript==

var poster = document.getElementsByClassName('poster');
var links = null;

for (var i = 0; i < poster.length; i++)
{
	links = poster[i].getElementsByTagName('a');
	if (links.length < 2)
		continue;
	links[1].href = links[0].href;
}

