// ==UserScript==
// @name           wikipedia personal notice
// @namespace      boomie.lol.wikiblock
// @include        http*wikipedia*
// ==/UserScript==

setInterval(function()
{
	var ids = ['centralNotice', 'siteNotice'];
	
	for (var id in ids)
		document.getElementById(ids[id]).style.display = "none";
}, 100);