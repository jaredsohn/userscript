// ==UserScript==
// @name        PennyArcade
// @description pa
// @include     http://*.penny-arcade.com
// @include     http://penny-arcade.com
// ==/UserScript==
var Titles, thisTitle;
Titles = document.evaluate(
    '//i',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisTitle = Titles.snapshotItem(0);
document.title = 'Penny Arcade: ' + thisTitle.textContent;