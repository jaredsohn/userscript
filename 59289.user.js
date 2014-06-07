// ==UserScript==
// @name           Feedsportal Ads-Skipper
// @namespace      http://github.com/bodo/userscripts
// @description    Remove Feedsportal Ads
// @include        http://da.feedsportal.com/*
// ==/UserScript==

(function(){
    links = document.evaluate("//div[@align='right']/p/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (links.snapshotLength > 0) {
        element = links.snapshotItem(0);
        window.location.href = element;
    }    
})();
