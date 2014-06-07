// ==UserScript==
// @name Vbulletin Remove BHW Lounge from New Posts
// @namespace http://warbucks.org/bhwnolounge
// @description vBulletin: Hides selected forums from search results
// @include http://www.blackhatworld.com/blackhat-seo/search.php?*
// ==/UserScript==

// Add comma-delimited quoted names of forums to hide, e.g. "Forum1", "Forum2"
var HIDDEN_FORUMS = new Array("BlackHat Lounge");

var forumNamePredicates = ".= '" + HIDDEN_FORUMS.join("' or .= '") + "'";
var xpathExpression = "id('threadslist')/tbody/tr[td/a[" + forumNamePredicates + "]]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}