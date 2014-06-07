// ==UserScript==
// @name           Fusetalk Hide Avatars
// @namespace      Fusetalk
// @description    Fusetalk Hide Avatars
// @include        *.anandtech.com/*
// ==/UserScript==

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='Message_TombstoneContainer') 
	{
		// rebuild the html in this div
		newdiv=anchor.innerHTML.substring(1,anchor.innerHTML.indexOf('<br />')+4);
		newdiv=newdiv+anchor.innerHTML.substring(anchor.innerHTML.indexOf('<strong>'));
		
		//assemble
		anchor.innerHTML=newdiv;
	}
}
