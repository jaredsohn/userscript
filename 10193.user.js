// ==UserScript==
// @name           Strip Trailing Spaces
// @namespace      Anandtech
// @description    Strips Trailing Spaces from Anandtech forum menu links
// @include        *forums.anandtech.com/*
// ==/UserScript==

//crimson117 hacked from Kill Truncation script

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);


var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='BoxContentText') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace(/\n\t+/g,''); //this removes the extra space at the end of each category link

	}


}