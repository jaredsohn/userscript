// ==UserScript==
// @name   RT.js
// @namespace  
// @description Replace all references of the RT url with a clickable link
// @include  http://mail.google.com
// ==/UserScript==

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<textNodes.snapshotLength;i++) {
 var myNode = textNodes.snapshotItem(i);
 var NodeSearch = myNode.match('^https://support.remc1.net:/rt/Ticket/Display.html?id=*');

//	var srcMatch = src.match('^http://www.example.com/forums/userpic/');
if (NodeSearch != null) {
  textNodes.snapshotItem(i) = '<a href=myNode>myNode</a>';
	}
}
