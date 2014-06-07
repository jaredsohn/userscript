// ==UserScript==
// @name           Clean Up New Menu
// @namespace      com.sparks
// @description    Hides the mew Mail / Contacts / Tasks menu that was recently added in the newest Gmail UI. Also removes the old Inbox link. Compose Mail, and Priority inbox remain visible. 
// @include        http*://mail.google.com/*
// ==/UserScript==

var css = ".CX, .T4, div.oo div.TK > div:first-child + div {display : none; !important};";
var iframes = window.frames;

window.addEventListener("load",loadedWindow,true); 

function loadedWindow()
{
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	}
	
	iframes = window.frames;
	
	for (var i = 0; i < iframes.length-1; i++)
	{
		if(!window.frames[i])continue;
		var pi = window.frames[i].document.evaluate("//a[@title='Priority Inbox']", window.frames[i].document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(!pi)continue;
		pi.innerHTML = 'Inbox';
	};
}