// ==UserScript==
// @name           Craigslist - Contract Job Alert
// @description    Identify Craigslist job listings that are contract jobs while in list view
// @namespace      http://tapuri.org
// @include        http://*.craigslist.org/*
// ==/UserScript==


function checkForMatchingText(parLink)
{
  	var link = parLink;
  	return function(details)
  	{
    		if (details.responseText)
    		{
    			if(details.responseText.indexOf('This is a contract job') >= 0)
    			{
      				link.innerHTML += ' <strong>[CONTRACT JOB]</strong>';
                               
        		}
      		}
    	}
};


try
{
	if (document.title.indexOf('jobs classifieds') >= 0)
	{
		links = document.getElementsByTagName("a");
		for (i=0; i<links.length; i++)
		{
			link = links[i];

			if (link.href && link.href.match(/.*craigslist.*\/\d+\.html$/))
			{
				GM_xmlhttpRequest({method:"GET", url: link.href,
					headers:{"User-Agent": "monkeyagent",
					"Accept":"text/html,text/monkey,text/xml,text/plain",},
					onload: checkForMatchingText(link)
				});
			}
	  	}
	}
}
catch(ex)
{}