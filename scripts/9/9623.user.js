// Anandtech Anchor Script
// version 1.0.2
// written by Alone, totaly screwed with by Evadman
// --------------------------------------------------------------------
//
//
// This is a Greasemonkey user script. To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Anandtech Anchor Script", and click Uninstall.
//
// ==UserScript==
// @name Anandtech Anchor Script
// @namespace Alone
// @description Turns all post anchors into links
// @include *.anandtech.com*
// ==/UserScript==


// add direct link to a post
	// get all anchors with name attribute and divs.
	anchors=document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	spans=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var namelinks = new Array();
	var a = 0;
	var b = 0;
	for (var i = 0; anchor=anchors.snapshotItem(i++);) 
	{
		if(!anchor.innerHTML && anchor.name !='top') 
		{
			a=a+1;
			namelinks[a]=anchor.name;
		}
	}
	
	for (var i = 0; span=spans.snapshotItem(i++);) 
	{
		if(span.className=='MessageTable_PostedOn' )//&& IsDate(span.innerText))
		{
			b=b+1
			// add link after the time on the post
			span.innerHTML=span.innerHTML+'&nbsp;<a href="#'+namelinks[b]+'">Direct Link</a>'; 
			// add link before the time on the post. remove the first 2 '//' to turn on this way and add the '//' in front of the line above
			//span.innerHTML='<a href="#'+namelinks[b]+'">Direct Link</a>&nbsp;'+span.innerHTML; 
			// add link after the time on the post as the cookie icon :) remove the first 2 '//' to turn on this way and add the '//' in front of the line above
			//span.innerHTML='<a href="#'+namelinks[b]+'"><img src="i/expressions/cookie.gif" border="0" title="Direct Link" alt="Direct Link"></a>&nbsp;'+span.innerHTML; 
			//span.innerHTML=span.innerHTML+'&nbsp;<a href="#'+namelinks[b]+'"><img src="i/expressions/cookie.gif" border="0" title="Direct Link" alt="Direct Link"></a>'; 
		}
	}
