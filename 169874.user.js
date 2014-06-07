// ==UserScript==
// @name        github rewrite data-hotkey
// @namespace   http://blakeley.com/
// @description I hate the way github hijacks slash for its own search box.
// @include     https://github.com/*
// @include     https://github.io/*
// @version     1
// ==/UserScript==
var list = document.evaluate(
    '//input[@data-hotkey]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
console.log('data-hotkey found', list);
for (var i=0; i<list.snapshotLength; i++) {
    var e = list.snapshotItem(i);
    console.log(i, e, e.getAttribute("data-hotkey"));
    if (e.getAttribute("data-hotkey").contains("/")) {
        e.setAttribute("data-hotkey",
            e.getAttribute("data-hotkey").replace("/", ""));
    }
}