// ==UserScript==
// @name        Link/Rel Based Key Controls
// @namespace   silvershadow
// @description Allows control+rightarrow and control+leftarrow to move to the next or previous page, as determined by link tags
// @include     *
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_getValue
// ==/UserScript==

$(unsafeWindow.document).ready(function() {
	$(unsafeWindow.document).keyup(function(event) {
		if (!event.ctrlKey) {
			return;
		}
		if (event.keyCode == 39) {
			var node = $('link[rel="next"]');
			if (node.attr("href")) {
				window.location = node.attr("href");
			}
			else {
				alert("No next page could be found");
			}
		}
		else if (event.keyCode == 37) {
			var node = $('link[rel="prev"]');
			if (node.attr("href")) {
				window.location = node.attr("href");
			}
			else {
				alert("No previous page could be found.");
			}
		}
	});
});
