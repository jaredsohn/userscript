// ==UserScript==
// @name        surveymonkey_ada
// @description make surveymonkey keyboard accessible
// @include     http://www.surveymonkey.com/*
// ==/UserScript==

var allMenus, thisMenu;
allMenus = document.evaluate(
    "//div[@class='qOption hover']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allMenus.snapshotLength; i++) {
    thisMenu = allMenus.snapshotItem(i);
    // Turn the label into an href, to make the menu accessible.
    text = thisMenu.innerHTML;
    thisMenu.innerHTML = '<a href="javascript:#">' + text + '</a>';
}