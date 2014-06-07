// ==UserScript==
// @name          Rotten Tomatoes Forums fix
// @description   Fixes the bug which causes certain deleted posts to expand pages on the Rotten Tomatoes forums.
// @namespace
// @include       http://www.rottentomatoes.com/vine/*
// ==/UserScript==

var brokenTables, thisTable;
brokenTables = document.evaluate(
    "//td[@nowrap='nowrap']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < brokenTables.snapshotLength; i++) {
    thisTable = brokenTables.snapshotItem(i);
    thisTable.removeAttribute('nowrap')
}