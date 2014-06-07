// ==UserScript==
// @name          YSI Skipper
// @description	  Automatically download the linked file on a YouSendIt page
// @include       http://*.yousendit.com/d.aspx*
// ==/UserScript==

(function() {
    var xpath = '//a/text()[contains(., "Download Now")]/..';
    var theLink = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    linkElement = theLink.snapshotItem(0);
    targetFile = linkElement.getAttribute("href");
    document.location = targetFile;
})();

// based heavily on the "Yahoo! Groups Interstitial Ads Skipper" from
// http://mkgray.com:8000/userscripts . cheers!

