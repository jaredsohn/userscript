// ==UserScript==
// @name           PDF/PPT/TIF viewer with Google docs by wenjie
// @namespace      http://www.google.com/
// @include        http://*
// @exclude        http://docs.google.com/*
// @version        0.1
// ==/UserScript==
// Based on script by Koonies (http://d.hatena.ne.jp/Koonies/): http://userscripts.org/scripts/show/59557

(function(){
	if (location.href.indexOf("http://docs.google.com/") == -1) {
		var l = document.getElementsByTagName("a");
		var i = l.length; 
		while (i--) {
			if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(pdf|ppt|tif|tiff|doc|docx|xls|xlsx|pptx|odt|ods|odp|odg|sxw|sxc|sxi|sxd)$/i)) {
				var ico = document.createElement("img");
				ico.src = "http://docs.google.com/favicon.ico";
				l[i].parentNode.insertBefore(ico, l[i]);
				l[i].href = 'http://docs.google.com/viewer?url=' + encodeURI(l[i].href);
			}
		}
	}
})();
