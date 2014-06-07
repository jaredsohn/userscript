// ==UserScript==
// @author         	Scott Dubler
// @version        	0.03
// @name           	Windows Live Search Ad Blocker
// @namespace     http://sdubler.spaces.live.com
// @description    Remove ads from Windows Live Search
// @include        	http://search.live.com/*
// ==/UserScript==

var d = document.getElementsByTagName('div')
var adRegexp = /^sb_ads[WN]/
for (var i=0; i<d.length; i++)
{
		if (adRegexp.test(d[i].className))
		{			
//			GM_log('removing ' + d[i].className)
			d[i].parentNode.removeChild(d[i])			
		}	
}
