// ==UserScript==
// @name			Twitter - Expand URLs Plus
// @namespace		http://www.minjiezha.com/greasemonkey
// @description		Swap twitter.com data-expanded-url attribute with href.
// @include			htt*://*.twitter.com/*
// @grant           none
// @match			http://twitter.com/*
// @match			http://*.twitter.com/*
// @match           https://twitter.com/*
// @match           https://*.twitter.com/*
// @match           https://twitter.com
// @version         1.0
// @encoding        UTF-8
// ==/UserScript==

function expandURL (element) {
	xpath = "//a[@data-expanded-url]";
	var candidates = document.evaluate(xpath, element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		expandedURL=cand.getAttribute("data-expanded-url");
		if (expandedURL) {
			// the actual attribute swapping will happen here
			cand.setAttribute("data-short-url",cand.getAttribute("href"))
			cand.setAttribute("href",expandedURL)
			cand.innerHTML = expandedURL;
		}
	}
}

function triggerExpand() {
    // expand the preloaded URLs
    expandURL(document);

    // add listener for expand dynamic loaded URLs
    containerId = 'stream-items-id';
    document.getElementById(containerId).addEventListener("DOMNodeInserted", function(event) {
        el = event.target;
        if  (el.parentNode.id === containerId) {
            expandURL(el);
        }
    }, false);

}

window.setTimeout(triggerExpand, 5000);
