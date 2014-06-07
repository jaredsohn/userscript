// ==UserScript==
// @name           Auto add to Google Reader
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Bypasses the "Add to Google homepage"/"Add to Google Reader" choice, directly adding to Google Reader.
// @include        http://www.google.com/ig/add?feedurl=*
// ==/UserScript==

(function() {
	var anchors = document.getElementsByTagName('a');
	for (var i = 0; i < anchors.length; i++) {
		if (anchors[i].innerHTML == "Add to Google Reader") {
			document.location.href = anchors[i].href;
		}
	}
})();