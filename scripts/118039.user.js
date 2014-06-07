// ==UserScript==
// @name           GMail new look notice remover
// @namespace      http://www.cykerway.com/
// @description    Remove 'Switch to the new look' notice bar on GMail
// @include        https://mail.google.com/*
// ==/UserScript==

// helper functions
function xpath(query) {
    return document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

// remove the notice
//
// delay for a while because the notice seems to be generated dyanmically
setTimeout(
    function () {
        ads = xpath('//div[@class="w-asK w-atd"]');
        for (var i = 0;i < ads.snapshotLength;i++) {
            ad = ads.snapshotItem(i);
            ad.parentNode.removeChild(ad);
        }
    }, 2
);
