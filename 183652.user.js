// ==UserScript==
// @name Twitter Unpromoted
// @description Removes promoted items on Twitter.
// @version 1.0
// @include https://twitter.com/*
// @include https://*.twitter.com/*
// @downloadURL https://dietrich.cx/dev/greasemonkey/twitterUnpromoted.user.js
// @updateURL https://dietrich.cx/dev/greasemonkey/twitterUnpromoted.meta.js
// @namespace cx.dietrich.greasemonkey
// @grant none
// ==/UserScript==

const PROMOTED_ITEMS = [
	'div.promoted-account',
	'li.stream-item > div.promoted-tweet',
	'li.promoted-trend'
];

// Permanent MutationObserver for changes to the current page
var pageObserver = undefined;

// Finds and removes promoted items
var findPromotedItems = function () {
	PROMOTED_ITEMS.forEach(function (selector) {
		var elements = document.querySelectorAll(selector);
		for (let i = 0; i < elements.length; i++) {
			elements[i].remove();
		}
	});
};

(function () {
	var pageContainer = document.getElementById('page-container');
	if (pageContainer !== null) {
		pageObserver = new MutationObserver(function (mutations) {
			var nodesAdded = false;
			mutations.forEach(function (mutation) {
				if (mutation.addedNodes !== null) {
					nodesAdded = true;
				}
			});
			if (nodesAdded) {
				findPromotedItems();
			}
		});
		var config = { childList: true, subtree: true };
		pageObserver.observe(pageContainer, config);
	}

	findPromotedItems();
})();
