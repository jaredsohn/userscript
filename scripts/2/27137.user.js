// ==UserScript==
// @author         	Scott Dubler
// @version        	0.01
// @name           	Spaces Ad Blocker
// @namespace     	http://sdubler.spaces.live.com
// @description    	Remove ads from Windows Live Spaces
// @include        	http://*.spaces.live.com/*
// ==/UserScript==

var d = document.getElementsByTagName('div')
for (var i=0; i<d.length; i++)
{
		if (d[i].id == 'AdContainer')
		{			
			d[i].parentNode.removeChild(d[i])
		}	
}
