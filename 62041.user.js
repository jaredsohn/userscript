// ==UserScript==
// @name Vbulletin screen unwanted OCAU topics
// @namespace http://userscripts.org/users/117756
// @description vBulletin: Hides selected forums from search results
// @include http://forums.overclockers.com.au/search.php?*
// ==/UserScript==

// Add comma-delimited quoted names of forums to hide, e.g. "Forum1", "Forum2"
var HIDDEN_FORUMS = new Array("The Gallery", "Microsoft Consoles", "Extreme Cooling", "Networking, Telephony and Internet", "Photography & Video", "Overclocking and Hardware", "Modding");

var forumNamePredicates = ".= '" + HIDDEN_FORUMS.join("' or .= '") + "'";
var xpathExpression = "id('threadslist')/tbody/tr[td/a[" + forumNamePredicates + "]]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}