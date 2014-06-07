// ==UserScript==
// @name Reuters Single Page View, v. 0.8
// @namespace http://www.philhq.com
// @include http://*.reuters.com/*
// @description Changes reuters.com to always use 'Single page view' in articles
// ==/UserScript==

(function()
{

	//if(document.location.href.match(/\/article\//) && !document.location.href.match(/sp\=true$/))
	//{
	//	if(document.location.href.match(/\?/) && document.location.href.match(/\=/))
	//	{
	//		document.location = document.location + '&sp=true';
	//	}
	//	else
	//	{
	//		document.location = document.location + '?sp=true';
	//	}
	//}

	var hrefs = document.getElementsByTagName('a');
	if (hrefs.length)
	{
		for(var i=0; i<hrefs.length; i++)
		{
			if(hrefs[i].href.match(/\/article\//) && hrefs[i].host.indexOf('reuters.com') != -1)
			{

				if(hrefs[i].href.match(/\?/) && hrefs[i].href.match(/\=/))
				{
					hrefs[i].href = hrefs[i].href + '&sp=true';
				}
				else
				{
					hrefs[i].href = hrefs[i].href + '?sp=true';
				}
			}
		}
	}
}
)();
