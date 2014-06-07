// ==UserScript==
// @name           DiceUserFilter
// @namespace      DiceUserFilter
// @description    Filter out users/trolls on Dice.com discussion boards
// ==/UserScript==

var trolls=['SQLGuy','EyeOfTheWitch'];
var xpath = document.evaluate("//div[@class='jive-message-list']//a[@title]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<xpath.snapshotLength; i++) {
	var node=xpath.snapshotItem(i);
	if (trolls.indexOf(node.title)<0) continue;
	for(var x=0; x<3; x++) { 
		do node = node.parentNode; while(node.tagName!='TR');
	}
	node.parentNode.removeChild(node);
}
