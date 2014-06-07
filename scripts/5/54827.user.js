// ==UserScript==
// @name          WMV Player
// @namespace     http://www.wmvplay.com.ar/
// @description   Redirects links to WMV videos to a WMV player.
// ==/UserScript==

for (var i in document.links)
{
	if (document.links[i].href && document.links[i].href.substr(-4) == '.wmv')
	{
		document.links[i].href = 'http://wmvplay.com.ar/?url='+document.links[i].href+'&m=2';
	}
}
