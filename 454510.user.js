// ==UserScript==
// @name        Auto Voter
// @namespace   http://chosenspace.com
// @description Auto Votes
// @include     http://*pbbghub.com/voting.php
// ==/UserScript==

var input = document.evaluate('//a[contains(@href,"vote.php?id=")]',
                              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (input) {
		for(var i = 0;i < input.snapshotLength; i++){
			var inputx=input.snapshotItem(i);
	GM_openInTab(inputx.href);}
//    alert(inputx.href);}
}
