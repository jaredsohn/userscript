// ==UserScript==
// @name          PopUpUrl
// @namespace     http://www.petitnoir.net/
// @description   
// @include       *
// ==/UserScript==

(function popup(){

	var links = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i < links.snapshotLength; i++) {
			links.snapshotItem(i).title += ' ' +links.snapshotItem(i).href;
	}
})();