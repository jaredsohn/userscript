// ==UserScript==
// @name           Userscripts.org show full titles
// @version        1.0
// @include        http://userscripts.org/*
// ==/UserScript==

var llinks = document.getElementsByTagName("a");
for (i = 0; i < llinks.length; i++)
 {
	if(llinks[i].innerHTML.substr(-3) == "..." ) {
		llinks[i].innerHTML = llinks[i].title;
	}
 }