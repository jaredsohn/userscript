// ==UserScript==
// @name           Ocado: remove unavailable delivery prices
// @namespace      http://raines.me.uk/
// @description    This script removes the prices from delivery slots which cannot be booked on ocado.com. Why would you want the price of something you can't have?
// @include        http://www.ocado.com/webshop/createAdvice.do*
// ==/UserScript==

var images = document.evaluate(
    "//table[@class='slots']/tbody/tr/td/img",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < images.snapshotLength; ++i) {
    var image = images.snapshotItem(i);
    if (/\/webshop\/static\/common\/images\/slotVanFaded.png(\?|$)/.test(image.src)) {
        image.parentNode.removeChild(image.nextSibling);
    }
}

