// ==UserScript==
// @name         NZBs(dot)ORG redirect removal
// @namespace    http://potatomouseproductions.com/
// @description  Removes outgoing redirects on NZBs(dot)ORG.
// @include      http://*.nzbs.org/*
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 

// ==/UserScript==

// based upon Outgoing Links Page Removal by Kasumi Ghia

var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i) {
	if(links[i].href.indexOf('http://anonym.to/?') > -1) {
		links[i].setAttribute("href", links[i].href.replace('http://anonym.to/?', ''));
	}
}

var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i) {
	if(links[i].href.indexOf('http://dontknow.me/') > -1) {
		links[i].setAttribute("href", links[i].href.replace('http://dontknow.me/', ''));
	}
}

var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i) {
	if(links[i].href.indexOf('http://derefer.me/?') > -1) {
		links[i].setAttribute("href", links[i].href.replace('http://derefer.me/?', ''));
	}
}