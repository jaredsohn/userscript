// ==UserScript==
// @name        Piriform.com Just Download
// @namespace   by bdam
// @description piriform quick download of the install file
// @include     *www.piriform.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

var links = document.links;

for (i=0; i<links.length; i++) {
	links[i].href = links[i].href.replace(/.com\/download$/,".com/Download").replace(/\/download$/,"/download/standard").replace(/\/portable$/,"/portable//downloadfile").replace(/\/slim$/,"/slim//downloadfile");
}