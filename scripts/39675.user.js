// ==UserScript==
// @name           Ocado: round delivery prices
// @namespace      http://raines.me.uk/
// @description    It's really hard to read a table of £n.99s. This script adds a penny to the prices for delivery on ocado.com
// @include        http://www.ocado.com/webshop/createAdvice.do*
// ==/UserScript==

var slots = document.evaluate(
    "//table[@class='slots']/tbody/tr/td",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < slots.snapshotLength; ++i) {
    var slot = slots.snapshotItem(i);
    if (slot.lastChild) {
        var price = slot.lastChild.nodeValue;
        price = price.replace(/(£\d+)\.49/, "$1.50").replace(/£(\d+)\.99/, function(match, whole) { return "£" + (++whole); });
        slot.replaceChild(document.createTextNode(price), slot.lastChild);
    }
}

