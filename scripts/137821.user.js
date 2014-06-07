// ==UserScript==
// @name        lego
// @namespace   http://avi.co
// @description Remove erroneous pluralisation of 'Lego'
// @include     *
// @version     1
// ==/UserScript==

strings = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var match = /\blegos\b/gi;
var substitute = 'Lego';
for (var i=0; i<strings.snapshotLength; i++) {
	var node = strings.snapshotItem(i);
	node.data = node.data.replace(match, substitute); 
}
