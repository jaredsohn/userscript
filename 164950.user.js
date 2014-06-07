// ==UserScript==
// @name          DRTest
// @namespace     http://www.angrybearsoftware.com/drtest
// @description   Scripting is fun
// @include       http://deeproute.com/deeproute/default.asp?js=loggerinc&viewpbp=*
// @version       1.0
// ==/UserScript==

textNodes = document.evaluate(
"//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var searchRE = new RegExp('Elsinger','gi');
var replace = 'Montana';
for(var i = 0; i<textNodes.snapshotLength;i++){
	var node = textNodes.snapshotItem(i);
	node.data = node.data.replace(searchRE, replace);
}