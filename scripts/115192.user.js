// ==UserScript==
// @name           Reddit link openner
// @namespace      the namespace
// @description    the description
// @include        http://reddit.com/r/funny/
// ==/UserScript==

alert("openning");
var titles = document.getElementsByClassName('title');
var links = titles.getElementsByTagName('a');
var i = 0;
var test = "Nothing";
GM_log(test + links.length);
for(i = 0; i< links.length; i++)
	test += "links[i].href";
	//GM_openInTab(links[i].href);
alert(test);