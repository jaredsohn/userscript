// ==UserScript==
// @name           Groups entity correct
// @namespace      saintjimmy
// @description    reposting of an old entity correct script for use in groups
// @include        http://groups.myspace.com/*fuseaction=messageboard.viewcategory*
// ==/UserScript==
(function() {

    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(String.fromCharCode(173), 'CORRECTION')
	//node.data = node.data.replace(String.fromCharCode(160), 'CORRECTION')
    }
})();