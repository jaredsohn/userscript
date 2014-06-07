// ==UserScript==
// @name           Facebook Simple Uploads
// @namespace      http://quietmint.com/code/
// @description    Always use the simple upload page for adding Facebook Photos
// @include        http://*.facebook.com/*
// ==/UserScript==

(function() {
	var anchors = document.getElementsByTagName('a');
	for (var i = 0; i < anchors.length; i++) {
		if (anchors[i].href.match('editalbum.php') && anchors[i].href.match('&add=1') && !anchors[i].href.match('&htmlup=1')) {
			anchors[i].href = anchors[i].href + '&htmlup=1';
		}
	}
})();