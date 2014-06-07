// ==UserScript==
// @name           Whirlpool News
// @namespace      whirlpool
// @description    Open whirlpool news in a new tab
// @include        http://whirlpool.net.au/
// ==/UserScript==

links = document.getElementsByTagName("a");

GM_log("Number of links: " + links.length);
	
for (x=0; x<links.length; x++)
{
	url = links[x].href;

	if (url.lastIndexOf("/go.cfm?article=") != -1)
	{		
		links[x].target="_blank";
	}
}