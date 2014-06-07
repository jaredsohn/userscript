// ==UserScript==
// @name        Show down hosters by default on Real debrid
// @namespace   http://userscripts.org/users/471458
// @include     /^https?://(www\.)?real-debrid\.com/.*$/
// @version     1.1
// @grant       none
// ==/UserScript==

setTimeout(function(){
	var element = document.evaluate('/html/body/div/div[2]/div/div[5]/div/div[2]/div/span[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (element != null) {
		element.click();
	}
}, 1000);