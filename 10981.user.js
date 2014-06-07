// ==UserScript==
// @name           Bonds Renamer
// @namespace      baseballsimulator.com
// @description    Removes trailing asterisks Bonds.
// @include        *
// ==/UserScript==

(function() {
    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(/Bonds\*+/g, "Bonds (all-time HR King)")
    }

})();
