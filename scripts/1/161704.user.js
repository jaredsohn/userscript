// ==UserScript==
// @name Vbulletin hides selected forums from search results vozforums
// @namespace http://userscripts.org/users/117756
// @description vBulletin: Hides selected forums from search results - Modify from http://userscripts.org/scripts/show/62041
// @include http://vozforums.com/search.php?*
// ==/UserScript==

// Add comma-delimited quoted names of forums to hide, e.g. "Forum1", "Forum2"
var HIDDEN_FORUMS = new Array("Liên Minh Huyền Thoại", "MMO -- Game Online");

var forumNamePredicates = ".= '" + HIDDEN_FORUMS.join("' or .= '") + "'";
var xpathExpression = "id('threadslist')/tbody/tr[td/a[" + forumNamePredicates + "]]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}