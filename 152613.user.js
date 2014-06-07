// ==UserScript==
// @name           my DD Script
// @namespace      tnsharea
// @description    1 enable ctrl key combination 2 rewrite url
// @include        http://*.dek-d.com/*
// @include        http://dek-d.com/*
// ==/UserScript==

// 1 enable ctrl key combination

var scriptCode = new Array();   // this is where we are going to build our new script

scriptCode.push('function disableCtrlKeyCombination(e) {}');

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');// create the script element
script.innerHTML = scriptCode.join('\n'); // add the script code to it
// scriptCode.length = 0;// recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 

// 2 rewrite url

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/^http:\/\/writer\.dek\-d\.com\/([a-zA-Z0-9_-]+)\/story\/*/gi)) {
		links[i].href = links[i].href.replace(/^http:\/\/writer\.dek\-d\.com\/([a-zA-Z0-9_-]+)\/story\//gi, "http://writer.dek-d.com/Writer/story/");
	}
}

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/^http:\/\/my\.dek\-d\.com\/([a-zA-Z0-9_-]+)\/story\/*/gi)) {
		links[i].href = links[i].href.replace(/^http:\/\/my\.dek\-d\.com\/([a-zA-Z0-9_-]+)\/story\//gi, "http://writer.dek-d.com/Writer/story/");
	}
}