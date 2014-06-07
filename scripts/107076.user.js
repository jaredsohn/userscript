// ==UserScript==
// @name           hide Facebook chat bar
// @namespace      jamespgilbert
// @include        http://www.facebook.com/*
// ==/UserScript==
var itv = setInterval(doStuff, 100);

function doStuff()
{
	if(document.getElementsByClassName("fbChatSidebar").length > 0)
	{
		document.getElementsByClassName("fbChatSidebar")[0].style.display="none";
		clearInterval(itv);
	}
}