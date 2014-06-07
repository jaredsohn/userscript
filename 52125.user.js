// ==UserScript==
// @name           Ocado: remove Internet only price
// @namespace      http://raines.me.uk/
// @description    I don't care about "Internet Only Price" offers. This script removes them from product listings on ocado.com.
// @include        http://www.ocado.com/*
// ==/UserScript==

var offers = document.evaluate(
    "//*[@class='priceMsg internetOnly']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < offers.snapshotLength; i++) {
    var offer = offers.snapshotItem(i);
    offer.parentNode.removeChild(offer.previousSibling);
    offer.parentNode.removeChild(offer);
}
