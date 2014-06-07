// ==UserScript==
// @namespace		http://www.ryanland.com/greasemonkey
// @name			twitter expand urls
// @include			http://*.twitter.com/*
// @include			http://twitter.com/*
// @description		Swap twitter.com data-expanded-url attribute with href.
// ==/UserScript==

function expandURLs () {

//	GM_log("Expanding URLs...");

	// Here's where it should happen -- unfortunately, candidates.snapshotLength is always zero
	xpath = "//a[@data-expanded-url]";
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		expandedURL=cand.getAttribute("data-expanded-url");
//		GM_log(expandedURL);
		if (expandedURL) {
			// the actual attribute swapping will happen here
			cand.setAttribute("data-short-url",cand.getAttribute("href"))
			cand.setAttribute("href",expandedURL)
//			Uncomment the following line to replace link text with expanded URL, too.
//			cand.innerHTML = expandedURL;
		}
	}
//	GM_log("URLs Expanded.")

}
window.setTimeout(expandURLs, 5000);
