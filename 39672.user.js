// ==UserScript==
// @name           Ocado: no jumbo pack notice
// @namespace      http://raines.me.uk/
// @description    This script removes notices about jumbo packs from product listings on ocado.com.
// @include        http://www.ocado.com/*
// ==/UserScript==

var offers = document.evaluate(
    "//p[@class='msg_POS']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < offers.snapshotLength; i++) {
    var offer = offers.snapshotItem(i);
    if (offer.firstChild.nodeValue == 'Jumbo Packs - Bigger Packs - Better Savings') {
        offer.parentNode.removeChild(offer.previousSibling);
        offer.parentNode.removeChild(offer);
    }
}

