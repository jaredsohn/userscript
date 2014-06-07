// ==UserScript==
// @name          Yahoo Group Interstitial Skipper
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://*.yahoo.com/*interrupt*
// @description	  When a Yahoo Groups message inserts an interstitial, automatically move on to the next page.
// ==/UserScript==

(function() {
    var xpath = '//a/text()[contains(., "Continue to message")]/..';
    var theLink = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    linkElement = theLink.snapshotItem(0);
    actualMessage = linkElement.getAttribute("href");
    document.location = actualMessage;
})();
