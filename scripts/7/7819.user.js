// ==UserScript==
// @name           Facebook Basketball Pool Nuker
// @author	   Matt Crawford
// @description    Removes the basketball pool items from Facebook's News Feed
// @include        *facebook.com/home.php*
// ==/UserScript==

(function() {
	var disp = true;

	for (var j = 0; j < 2; j++) {
		var links = document.links;
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.indexOf("stories.php?filter=21") > -1) {
				var outer = links[i].parentNode.parentNode;
				//if (disp) disp = confirm(outer.innerHTML);
				outer.parentNode.removeChild(outer);
			}
		}
	}
})();