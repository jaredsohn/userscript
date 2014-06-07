// ==UserScript==
// @name EVE Forum External Linky
// @namespace http://localhost
// @include   https://forums.eveonline.com/*
// @description Removes the confirmation dialog that comes up when you click an external link.
// ==/UserScript==

(function()
{
	
	unsafeWindow.$(function(){
		unsafeWindow.$("a.warn").unbind("click");
	});
	var links = unsafeWindow.document.getElementsByTagName('a');
	for(i=0;i<links.length;i++)
	{
		
		links[i].href=unescape(links[i].href.replace(/http.*default.aspx\?g=warning&l=(.*)&domain=.*/i,"$1"));
	}
})();