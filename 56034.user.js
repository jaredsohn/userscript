// ==UserScript==
// @name Wall Street Journal Referrer Spoof
// @namespace http://www.philhq.com
// @include http://*.wsj.com/*
// @description Changes wsj.com links to be referred by digg.com
// ==/UserScript==

(function()
{
	var hrefs = document.getElementsByTagName('a');
	if (hrefs.length)
	{
		for(var i=0; i<hrefs.length; i++)
		{
			if(hrefs[i].href.match(/\/article\//) && hrefs[i].host.indexOf('wsj.com') != -1)
			{
				hrefs[i].href = hrefs[i].href.replace(/http:/, "spoof:");
				hrefs[i].href = hrefs[i].href + ';ref://digg.com';
			}
		}
	}
}
)();