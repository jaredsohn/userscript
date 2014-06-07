// ==UserScript==

// @name           M110

// @namespace      Andromeda

// @description    Hides selected forums from the index page. (vBulletin)
// @include        *

// @exclude        */forumdisplay.php*
// ==/UserScript==

// Add quoted names of forums to hide delimited by comma, e.g. "Forum", "AnotherForum"
var forums = new Array("Speed Server Ambassade", "Server 2 Ambassade", "Travian FAQ", "Udenfor emne");

var containsvar = "contains(td/div/a/strong,'" + forums.join("') or contains(td/div/a/strong,'") + "')";
var xpathExpression = "//tr[" + containsvar + "]";
var rows = document.evaluate(xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < rows.snapshotLength; i++) {
var row = rows.snapshotItem(i);
row.style.display = "none";
}