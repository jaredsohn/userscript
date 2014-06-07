// ==UserScript==
// @name           MTG Salvation Spoiler Visible Anchors
// @namespace      http://www.toddmoon.com/GreaseMonkey/
// @description    Makes named anchors on cards visible and link to themselves. This way you can click on a card number and send the address to your friend and the link will go straight to that card.
// @include        http://mtgsalvation.com/*spoiler.html*
// ==/UserScript==

var list = document.evaluate(
	"//a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for ( var i = 0; i < list.snapshotLength; i++)
{
	var a = list.snapshotItem(i);
	
	if ( a.name.match( /^\d+$/ ) )
	{		
		a.innerHTML = a.name;
		a.href = '#' + a.name;
		a.style.fontSize = '8pt';
	}
}