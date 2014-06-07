// ==UserScript==
// @name           PDF/PPT/TIF viewer with Google docs
// @namespace      http://d.hatena.ne.jp/Koonies/
// @include        http://*
// @exclude        http://docs.google.com/*
// @version        1.2
// ==/UserScript==

(function(){
	if (location.href.indexOf("http://docs.google.com/") == -1) {
		var l = document.getElementsByTagName("a");
		var i = l.length; 
		while (i--) {
			if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(pdf|ppt|tif|tiff)$/i)) {
				var ico = document.createElement("img");
				ico.src = "http://docs.google.com/favicon.ico";
				l[i].parentNode.insertBefore(ico, l[i]);
				l[i].href = 'http://docs.google.com/viewer?url=' + l[i].href;
			}
		}
	}
})();
