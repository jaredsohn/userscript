// ==UserScript==
// @name           theloo.katt.it bypasser
// @namespace      http://www.warforum.cz
// @include        http://*katt.it/*
// ==/UserScript==

(function()
{
	var scriptElms = document.getElementsByTagName('script');
	window.location = scriptElms[6].innerHTML.match(/Proceed to URL - <a href="(.+?)">/)[1];
}
)();