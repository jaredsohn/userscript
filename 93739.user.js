// ==UserScript==
// @name           fuckyoumoot
// @namespace      0
// @include        http://boards.4chan.org/b/*
// ==/UserScript==

var links = document.getElementsByTagName("link");
for(i=0; i<links.length; i++)
	links[i].parentNode.removeChild(links[i]);

function addcss(url) {
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = url;
	document.getElementsByTagName("head")[0].appendChild(cssNode);
}


addcss('http://static.4chan.org/css/global.9.css');
addcss('http://static.4chan.org/css/yotsuba.9.css');