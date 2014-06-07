// ==UserScript==
// @name           Harry is an idiot
// @namespace      http://manuelseeger.de
// @description    Replaces 'Harry Potter' with 'Heiner' on amazon
// @include        http://*amazon.*
// ==/UserScript==

(function() {
    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(/Harry[-\s]*Potter/gi, 'Heiner')
    }

})();
