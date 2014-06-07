// ==UserScript==
// @name           Ocado: fade out of stock
// @namespace      http://raines.me.uk/
// @description    When a product is out of stock on ocado.com it isn't clear that it isn't available. This script fades the out of stock results.
// @include        http://www.ocado.com/*
// ==/UserScript==

var opacity = 0.5;

var headings = document.evaluate(
    "//div[@class='productDetails high']/h4",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < headings.snapshotLength; ++i) {
    var heading = headings.snapshotItem(i);
    if (/\(temporarily out of stock\)/.test(heading.lastChild.nodeValue)) {
        heading.parentNode.parentNode.style.opacity = opacity;
    }
}

