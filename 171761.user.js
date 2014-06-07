// ==UserScript==
// @name         Herald Sun -> News.com.au
// @include      http://*.heraldsun.com.au/*
// @description  replace "heraldsun.com.au/" with "news.com.au/"
// ==/UserScript==

    (function()
{
    var allLinks = document.links;

    if (allLinks != null)
	{
		for (i = 0; i <allLinks.length; ++i)
			{
				if (allLinks [i].href.indexOf ("//heraldsun.com.au") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//heraldsun.com.au/", "//news.com.au/");
				}
			}
	}
}
)();