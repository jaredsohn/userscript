// ==UserScript==
// @name        Hosszupuska Link Fix
// @namespace   http://userscripts.org/scripts/show/169845
// @grant       none
// @include     http://hosszupuskasub.com/*
// @version     1.0.0
// ==/UserScript==

var links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++){
	if(links[i].href.search("linkbucks.com")!=-1){
		links[i].href = links[i].href.substring(links[i].href.lastIndexOf("http://"));
	}
	if(links[i].href.search("adf.ly")!=-1){
		links[i].href = "http://"+links[i].href.substring(links[i].href.lastIndexOf("www"));
	}
}
