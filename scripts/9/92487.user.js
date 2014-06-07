// ==UserScript==
// @name         51NBForum url replace
// @include      http://tentyp.eu/*
// @description  replace "forum.51nb.com" "www.thinkpad.cn/forum/" "51nb.com/forum/" with "www.51nb.com/forum"
// ==/UserScript==

    (function()
{
    var allLinks = document.links;

    if (allLinks != null)
	{
		for (i = 0; i <allLinks.length; ++i)
			{
				if (allLinks [i].href.indexOf ("//tentyp.pl") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//tentyp.pl", "//tentyp.eu");
				}
			
			}
	}
}
)();
