
// ==UserScript==
// @namespace		http://www.ryanland.com/greasemonkey
// @name				Link Twitter-style tags back to Twitter and beyond
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			http://www.facebook.com/ai.php*
// @exclude			https://www.facebook.com/ai.php*
// @description		Link #HashTags and @AtTags in FB content back to Twitter as suggested by Chris Pirillo
// ==/UserScript==

function hashbook () {

	xpaths=[
		"//span[@data-jsid='text']",
		"//span[@class='messageBody']"
	]
	for (pathNum=0; pathNum<xpaths.length; pathNum++) {
		xpath = xpaths[pathNum];
		var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
			newHTML = cand.innerHTML;
			if (newHTML.indexOf("#") > 0) {
				newHTML = newHTML.replace(/#([^ .,]+)/g,"<a href=\"http://twitter.com/#!/search?q=%23$1\" target=\"_blank\">#$1</a>")
			}
			if (newHTML.indexOf("@") > 0) {
				newHTML = newHTML.replace(/@([^ .,]+)/g,"<a href=\"http://twitter.com/#!/$1\" target=\"_blank\">@$1</a>")
			}
			cand.innerHTML = newHTML;
		}
	}

}
window.setTimeout(hashbook, 3000);
