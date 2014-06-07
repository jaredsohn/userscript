// ==UserScript==
// @name Barrons Referrer Spoof
// @namespace http://www.philhq.com
// @include http://*.barrons.com/*
// @include http://online.barrons.com/*
// @description Changes barrons.com links to be referred by news.google.com
// ==/UserScript==

(function()
{
	var hrefs = document.getElementsByTagName('a');
	if (hrefs.length)
	{
		for(var i=0; i<hrefs.length; i++)
		{
			if(hrefs[i].href.match(/\/article\//) && hrefs[i].host.indexOf('barrons.com') != -1)
			{
				hrefs[i].href = hrefs[i].href.replace(/http:/, "spoof:");
				hrefs[i].href = hrefs[i].href + ';ref://news.google.com';
			}
		}
	}
}
)();