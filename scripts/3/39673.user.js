// ==UserScript==
// @name           Ocado: not Tesco
// @namespace      http://raines.me.uk/
// @description    I don't care about "Tesco Price Match" offers. This script removes them from product listings on ocado.com.
// @include        http://www.ocado.com/*
// ==/UserScript==

var offers = document.evaluate(
    "//*[@class='priceMsg offer']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < offers.snapshotLength; i++) {
    var offer = offers.snapshotItem(i);
    if (/^Tesco Price Match\*+$/.test(offer.firstChild.nodeValue)) {
        offer.parentNode.removeChild(offer.previousSibling);
        offer.parentNode.removeChild(offer);
    }
}

