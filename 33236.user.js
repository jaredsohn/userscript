// ==UserScript==
// @name TankSpot WoW Only
// @namespace http://userscripts.org/Bonerot
// @description vBulletin: Hides selected forums from search results
// ==/UserScript==

// Modified just to remove AoC from Tankspot Forums

// Add comma-delimited quoted names of forums to hide, e.g. "Forum1", "Forum2"
var HIDDEN_FORUMS = new Array("AoC Soldier General");

var forumNamePredicates = ".= '" + HIDDEN_FORUMS.join("' or .= '") + "'";
var xpathExpression = "id('threadslist')/tbody/tr[td/a[" + forumNamePredicates + "]]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}