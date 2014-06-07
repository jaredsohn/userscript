// ==UserScript==
// @name           CS2 Assault Command Deck select
// @namespace      CS
// @include        http://g1.chosenspace.com/index.php?go=attack_board*
// ==/UserScript==
alltags=document.evaluate("//input[@name='board']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistak=alltags.snapshotItem(alltags.snapshotLength-1);
if(thistak){
	thistak.checked=true;
}
