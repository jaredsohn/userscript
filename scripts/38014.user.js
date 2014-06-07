// vim: ts=4 sts=4 sw=4 et
// ==UserScript==
// @name           Thrive Show Subcategory Names
// @namespace      www.arthaey.com
// @description    Shows the subcategory name of a transaction as a tooltip
// @include        https://www.justthrive.com/*
// ==/UserScript==

window.addEventListener("load", function() {

var transactions = document.evaluate(
    "//li[contains(@class, 'tagIcons')]/h6",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var transaction;
for (var i = 0; i < transactions.snapshotLength; i++) {
    transaction = transactions.snapshotItem(i);
    transaction.title = transaction.textContent;
}

}, true);
