// ==UserScript==
// @name           Remove cached links
// @namespace      Fremnet
// @description    Removes the cached links from google search
// @include        *google*/search?*
// ==/UserScript==

(function() {
	var as = document.getElementsByTagName('a');
	for (var a in as)
		if (as[a].textContent == 'Cached') {
			var p = as[a].parentNode
			// Remove the " - "
			p.removeChild(as[a].nextSibling);
			// Remove the cached link
			p.removeChild(as[a]);
		}
})()