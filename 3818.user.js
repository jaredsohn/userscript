// ==UserScript==
// @name          Sideload Download
// @namespace     http://linuxgate.org/library/greasemonkey
// @description	  "sideloading" sucks, downloading is much more fun. This script changes the function of the "SL" icon to provide a direct download link.
// @include       http://sideload.com/*
// @include       http://www.sideload.com/*
// ==/UserScript==

var downloader = {
	init : function(){
		for (var i = 0; i < document.links.length; ++i) {
			var link = document.links[i];
			if(!link.hasAttribute('href'))
				continue;
			var result = link.href.match(/^javascript:Sideload\(\'(.*)\',\'(.*)\'\)\;$/);
			if (result)
				document.links[i].href = result[1];
		}
	}
}
if(document.body)
	downloader.init();