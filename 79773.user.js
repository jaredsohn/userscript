// ==UserScript==
// @name           View Word, Powerpoint, PDF and TIFF files with Google Docs Viewer
// @namespace      Updated version from http://d.hatena.ne.jp/Koonies/
// @include        http://*
// @exclude        http://docs.google.com/*
// @version        1.0
// ==/UserScript==

(function(){
	if (location.href.indexOf("http://docs.google.com/") == -1) {
		var l = document.getElementsByTagName("a");
		var i = l.length; 
		while (i--) {
			if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(doc|docx|pdf|ppt|tif|tiff)$/i)) {
				var ico = document.createElement("img");
				ico.src = "http://docs.google.com/favicon.ico";
				l[i].parentNode.insertBefore(ico, l[i]);
				l[i].href = 'http://docs.google.com/viewer?url=' + l[i].href;
			}
		}
	}
})();
