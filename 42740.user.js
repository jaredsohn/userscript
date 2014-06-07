// ==UserScript==
// @name           Facebook Adbar Killer
// @namespace      http://userscripts.org/users/23418
// @description    Hides Facebook's new adbar without breaking the page layout
// @include        *facebook.com*
// ==/UserScript==

f23418a = function() {
var headers = document.evaluate("//div[contains(@class, 'fadbar_header')]",
				document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
var columns = document.evaluate("//div[contains(@class, 'fadbar_column')]",
				document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

if (headers.snapshotLength > 0) {
     for (var i = 0; i < headers.snapshotLength; i++) {
	  var h = headers.snapshotItem(i);
	  h.style.display = "none";
     }
}

if (columns.snapshotLength > 0) {
     for (var i = 0; i < columns.snapshotLength; i++) {
	  var column = columns.snapshotItem(i);
	  column.style.display = "none";
     }
}

window.setTimeout(f23418a, 1000);
};

f23418a();