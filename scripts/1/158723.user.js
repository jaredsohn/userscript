// ==UserScript==
// @name         51NBForum url replace
// @include      http://*.51nb.com/*
// @include      http://*.thinkpad.cn/*
// @description  replace "forum.51nb.com/" "www.thinkpad.cn/forum/" "51nb.com/forum/" "www.51nb.com/forum/" with "www.ibmnb.com/forum/"
// ==/UserScript==

    (function()
{
    var allLinks = document.links;

    if (allLinks != null)
	{
		for (i = 0; i <allLinks.length; ++i)
			{
				if (allLinks [i].href.indexOf ("//forum.51nb.com") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//forum.51nb.com", "//www.ibmnb.com/forum");
				}
				if (allLinks [i].href.indexOf ("//www.thinkpad.cn/forum") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//www.thinkpad.cn/forum", "//www.ibmnb.com/forum");
				}
				if (allLinks [i].href.indexOf ("//51nb.com/forum") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//51nb.com/forum", "//www.ibmnb.com/forum");
				}
				if (allLinks [i].href.indexOf ("//51nb.com/forum") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("//51nb.com/forum", "//www.ibmnb.com/forum");
				}
			}
	}
}
)();