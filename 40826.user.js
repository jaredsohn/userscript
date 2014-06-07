// ==UserScript==
// @name           Akibakko Quick Save
// @namespace      akiqsave
// @description    Generate actual link for quick picture save for akibakko gallory
// @include        http://akibakko.net/*
// ==/UserScript==

function init()
{
	var raw_link="",new_link;
	for(var i=0;i<40;i++)
	{
		if(document.getElementsByTagName('img')[i*2]==null) return false;	// If no picture, terminate
		raw_link=document.getElementsByTagName('img')[i*2].src;
		new_link=raw_link.replace("thumb","image");

		// Paste New Link
		document.getElementsByTagName('p')[i].innerHTML+="<br><img src='http://upic.me/i/0s/favicon.png' alt='Mimi'/><a style='margin-left:5px; font-size:11px;' href=\""+new_link+"\">Save Image";
	}
}

init();