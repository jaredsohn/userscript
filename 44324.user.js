// ==UserScript==
// @name        Collapse all Google Reader Subscriptions
// @namespace   http://etherpad.com/uCqN2TKk6E
// @description Collapse all Google Reader Subscriptions
// @include     http*://www.google.com/reader/*
// ==/UserScript==

function collapse_all(){
	var ress = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0;i<ress.snapshotLength;i++) {
		ress.snapshotItem(i).className = "folder unselectale collapsed unread";
	}
}

var sublink = document.getElementById('sub-tree-header');
sublink.parentNode.setAttribute('style', 'background:url(/reader/ui/972236033-lhn-sprite.png) no-repeat; background-position:9px -58px; ');
sublink.setAttribute('style', 'margin-left:20px; border: 4px solid white; background-color:white;');
sublink.parentNode.addEventListener("click", collapse_all,false);