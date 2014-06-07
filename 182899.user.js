// ==UserScript==
// @name Twitter Unshortened
// @description Expands t.co URLs on Twitter.
// @version 1.3
// @include https://twitter.com/*
// @include https://*.twitter.com/*
// @downloadURL https://dietrich.cx/dev/greasemonkey/twitterUnshortened.user.js
// @updateURL https://dietrich.cx/dev/greasemonkey/twitterUnshortened.meta.js
// @namespace cx.dietrich.greasemonkey
// @grant none
// ==/UserScript==

const LINK_SELECTORS = {
	'a[data-expanded-url]': 'data-expanded-url',
	'.profile-field > a[rel~=me]': 'title'
}
const COMMON_CONTAINERS = [
	'#stream-items-id',
	'#profile_popup',
	'.Gallery'
];

// Permanent MutationObserver for high-level changes to the current page
var pageObserver = undefined;
// MutationObservers for link-containing elements on the current page
var containerObservers = [];

// Unshorten links in the given element or array-like list of elements
var unshorten = function (target) {
	var unshortenElement = function (element) {
		for (let selector in LINK_SELECTORS) {
			let attribute = LINK_SELECTORS[selector];
			let links = element.querySelectorAll(selector);
			for (let i = 0; i < links.length; i++) {
				links[i].setAttribute('href', links[i].getAttribute(attribute));
			}
		}
	};

	if ('length' in target) {
		for (let i = 0; i < target.length; i++) {
			unshortenElement(target[i]);
		}
	} else {
		unshortenElement(target);
	}
};

// Observe the given container for added nodes and unshorten them
var observe = function (container) {
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.addedNodes !== null) {
				unshorten(mutation.target);
			}
		});
	});
	var config = { childList: true, subtree: true };
	observer.observe(container, config);
	containerObservers.push(observer);
};

// Find and shorten any link-containing elements on the current page
var findLinkContainers = function () {
	containerObservers.forEach(function (observer) {
		observer.disconnect();
	});
	containerObservers = [];

	// Containers that are part of most pages
	COMMON_CONTAINERS.forEach(function (selector) {
		var elements = document.querySelectorAll(selector);
		for (let i = 0; i < elements.length; i++) {
			unshorten(elements[i]);
			observe(elements[i]);
		}
	});

	// Individual tweet pages contain this element
	var tweets = document.getElementsByClassName('permalink-tweet');
	if (tweets.length > 0) {
		unshorten(tweets);
	}
	// Individual profile pages contain this element
	var profile = document.getElementsByClassName('profile-card');
	if (profile.length > 0) {
		unshorten(profile);
	}
};

(function () {
	var pageContainer = document.getElementById('page-container');
	if (pageContainer !== null) {
		pageObserver = new MutationObserver(function (mutations) {
			var pageChanged = false;
			mutations.forEach(function (mutation) {
				if (mutation.type === 'childList') {
					pageChanged = true;
				}
			});
			if (pageChanged) {
				findLinkContainers();
			}
		});
		var config = { childList: true, subtree: false };
		pageObserver.observe(pageContainer, config);
	}

	findLinkContainers();
})();
