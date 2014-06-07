// ==UserScript==
// @name           open-selected-links
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Opens all the selected links in new tabs (one tab per link)
// @include        *
// ==/UserScript==
(function() {
	document.addEventListener('mouseup', function() {
		var selection = window.getSelection();
		if (selection) {
			var range = selection.getRangeAt(0);
			var selectionDom = range.cloneContents();
			var selectedLinks = selectionDom.querySelectorAll('a');
			
			for (var i = selectedLinks.length - 1; i >= 0; i--){
				GM_openInTab(selectedLinks[i].href);
			};
		}
	}, true);
})();