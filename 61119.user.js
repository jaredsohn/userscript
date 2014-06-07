// ==UserScript==
// @name          Copy URL in Google search
// @namespace     http://d.hatena.ne.jp/kurumigi/
// @description   Enable copying URLs if logged in to Google.
// @include       http*://www.google.tld/search*
// @include       http*://www.google.tld/custom*
// @include       http*://www.google.tld/cse*
// @version       0.2
// ==/UserScript==

(function() {
	function replaceEvent(node) {
		var aElm = document.evaluate('.//a[contains(concat(" ", @class, " "), " l ")]', node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (var i = 0; i < aElm.snapshotLength; i++) {
			if (aElm.snapshotItem(i).hasAttribute('onmousedown')) {
				var mousedown = aElm.snapshotItem(i).getAttribute('onmousedown');
				aElm.snapshotItem(i).removeAttribute('onmousedown');
				aElm.snapshotItem(i).setAttribute('onmouseup', 'if (event.button != 2) { ' + mousedown  + ' };');
			}
		}
	}
	
	replaceEvent(document);
	
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt) {
		replaceEvent(evt.target);
	},false);
})();
