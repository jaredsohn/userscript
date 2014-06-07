// ==UserScript==
// @name           baidu ad remover
// @namespace      http://www.cykerway.com
// @description    Remove ads on baidu.com
// @include        http://*.baidu.com/*
// ==/UserScript==

// helper functions
function xpath(query) {
    return document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

// remove the top banner
ads = xpath('//table[@class="EC_mr15"]');
for (var i = 0;i < ads.snapshotLength;i++) {
    ad = ads.snapshotItem(i);
    ad.parentNode.removeChild(ad);
}

// remove the right column
ads = xpath('//table[@align="right"]');
for (var i = 0;i < ads.snapshotLength;i++) {
    ad = ads.snapshotItem(i);
    ad.parentNode.removeChild(ad);
}
