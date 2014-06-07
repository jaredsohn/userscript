// ==UserScript==
// @name           AutoPagerize API Provider in Hatena Bookmark
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Provide APIs compatible with "AutoPagerize" in Hatena Bookmark
// @include        http://b.hatena.ne.jp/*/*
// @include        http://b.hatena.ne.jp/search?*
// ==/UserScript==

(function() {
	// set event listeners
	function addEventListeners(hookNodeId, targetClassNameRE) {
		var DEBUG = false;

		var filters = [];
		var docFilters = [];

		var hookNode = document.getElementById(hookNodeId);

		if (hookNode) {
			// DOMNodeInserted event
			hookNode.addEventListener('DOMNodeInserted',function(evt) {
				if (targetClassNameRE.test(evt.target.className)) {
					// Target is parent node of the added node.
					var targetNode = evt.target;
					var parentNode = evt.relatedNode;

					var insertedPageLinkXPath = './preceding-sibling::div[contains(concat(" ", @class, " "), " pager-autopagerize ")][1]/a[last()]'
					var insertedURL = document.evaluate(insertedPageLinkXPath, targetNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;

					// Apply document filters
					docFilters.forEach(function(f) { f(targetNode, insertedURL, {}) });

					// Dispatch 'AutoPagerize_DOMNodeInserted' event
					var ev1 = document.createEvent('MutationEvent');
					ev1.initMutationEvent('AutoPagerize_DOMNodeInserted', true, false, parentNode, null, insertedURL, null, null);
					targetNode.dispatchEvent(ev1);

					// Apply filters
					filters.forEach(function(f) { f([targetNode]) });

					// Dispatch 'GM_AutoPagerizeNextPageLoaded' event
					var ev2 = document.createEvent('Event');
					ev2.initEvent('GM_AutoPagerizeNextPageLoaded', true, false);
					document.dispatchEvent(ev2);
				}
			}, false);

			// AutoPagerizeToggleRequest event
			document.addEventListener('AutoPagerizeToggleRequest', function(evt) {
				var pointerXPath = '//div[contains(concat(" ", @class, " "), " pager-autopagerize ")]//img[@class="pointer"]'
				var pointer = document.evaluate(pointerXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				var ev3 = document.createEvent('Event');
				ev3.initEvent('click', true, false);
				pointer.dispatchEvent(ev3);
			}, false)

			// AutoPagerize APIs
			window.AutoPagerize = {};
			window.AutoPagerize.addFilter = function(f) {
				if (DEBUG) { GM_log('Push filters : ' + (f.name ? f.name : f.toString().replace(/\s+/g,' '))); }
				filters.push(f);
			}
			window.AutoPagerize.addDocumentFilter = function(f) {
				if (DEBUG) { GM_log('Push document filters : ' + (f.name ? f.name : f.toString().replace(/\s+/g,' '))); }
				docFilters.push(f);
			}

			// Dispatch 'GM_AutoPagerizeLoaded' event
			var ev4 = document.createEvent('Event')
			ev4.initEvent('GM_AutoPagerizeLoaded', true, false)
			document.dispatchEvent(ev4)
		}
	}

	if (/^http:\/\/b\.hatena\.ne\.jp\/search\?/.test(location.href)) {
		// Search result
		addEventListeners('res', /\bsearch-result-list\b/);
	} else if (/^http:\/\/b\.hatena\.ne\.jp\/(?:(?:t|keyword|location|entrylist)\/|(?:entrylist|asin|video)(?:\?|$))/.test(location.href)) {
		// Tag page / Keyword page / Local page / Hotentry page / ASIN page / Video page
		addEventListeners('main', /\b(?:hotentry|videolist)\b/);
	} else {
		// Others (user page)
		addEventListeners('hatena-body', /\bbookmarked_user\b/);
	}
})();
