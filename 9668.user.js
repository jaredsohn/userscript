// ==UserScript==
// @name           My forums
// @namespace      Anandtech
// @description    my forums link goes to your latest posts
// @include        *.anandtech.com/*
// ==/UserScript==

//get all divs
anchors=document.evaluate('//td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);


var newtd = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='MenuBar') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('today.aspx','today.aspx?FTVAR_TODAYPAGE=4');
		

	}


}