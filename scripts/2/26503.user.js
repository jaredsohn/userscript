// ==UserScript==
// @name vBulletin User Ignore
// @namespace http://userscripts.org/jthomas
// @description vBulletin: Hides selected user threads from Forums 
// ==/UserScript==

// Add comma-delimited quoted names of users to hide, e.g. "Forum1", "Forum2"
var HIDDEN_USERS = new Array("Josh");

var userNamePredicates = ".= '" + HIDDEN_USERS.join("' or .= '") + "'";
var xpathExpression = "id('threadslist')/tbody/tr[td/div/span[" + userNamePredicates + "]]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}