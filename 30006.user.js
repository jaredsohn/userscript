// ==UserScript==
// @name           Flickr Spaceball Remover
// @namespace      http://flaffy.org/
// @description    Removes the "spaceball" image from flickr and allows right-clicking.
// @include        http://*.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==

(function() {

	window.addEventListener('load', function(e) {
	
		var result = document.evaluate(
			"//img[contains(@src, '/spaceball.gif')]",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		);
		if(result.singleNodeValue) {
			var node = result.singleNodeValue;
			node.parentNode.removeChild(node);
		}
		
	}, false);

})();
