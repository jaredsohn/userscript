// ==UserScript==
// @name           Twitter direct links
// @namespace      AgaMis
// @description    Removes URL redirection from links in twits
// @license        GPL v3
// @include        https://twitter.com/*
// @author         Aganel
// @version        0.1.2
// ==/UserScript==

(function(){
	document.addEventListener('DOMNodeInserted', function(event) {
		aa = document.evaluate(
			'//a[@class="twitter-timeline-link"]', event.target,
			null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var i=0; i<aa.snapshotLength; i++)
			aa.snapshotItem(i).href = aa.snapshotItem(i).getAttribute(
				aa.snapshotItem(i).hasAttribute('data-ultimate-url') ?
				'data-ultimate-url':
				'data-expanded-url'
			);
	}, true);
})();