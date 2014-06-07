// ==UserScript==
// @name           MTG Salvation Spoiler Sort
// @namespace      http://www.toddmoon.com/greasemonkey
// @description    Sorts an MTG Salvation spoiler by update time.
// @include        http://mtgsalvation.com/*spoiler.html*
// ==/UserScript==

var cards = new Array();

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
		cards[a.name] = a.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
	}
}

var cardTableResult = document.evaluate(
	"/html/body/table/tbody/tr/td/table[3]",
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null
);

var cardTableParent = cardTableResult.singleNodeValue.parentNode;

cardTableParent.removeChild( cardTableResult.singleNodeValue );

var arrayOfCardIndexes = new Array();
var cardIndex = 0;

for ( cardUpdateNumber in cards )
{
	arrayOfCardIndexes[ cardIndex++ ] = cardUpdateNumber;
}

arrayOfCardIndexes.sort( function(a,b){return a - b} );

for( var cardIndex = arrayOfCardIndexes.length - 1; cardIndex >= 0; cardIndex-- )
{	
	var newDiv = document.createElement('div');
	newDiv.style.marginBottom = '15px';
	
	newDiv.innerHTML = cards[ arrayOfCardIndexes[ cardIndex ] ];
	
	cardTableParent.appendChild(newDiv);
	
	var smallResult = document.evaluate(
		"small",
		newDiv,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	);
	
	var small = smallResult.singleNodeValue;
	
	if ( small )
	{	
		var sourceDiv = document.createElement('div');
		sourceDiv.style.textAlign = 'center';
		
		newDiv.appendChild( sourceDiv );
		
		sourceDiv.appendChild( small );
	}
}