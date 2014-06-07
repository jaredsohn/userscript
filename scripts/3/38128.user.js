// ==UserScript==
// @name         Subs-team.tv - Baja Subs Directo
// @include      http://www.subs-team.tv/* 
// @description  Subs-Team
// @author       FiLeX
// ==/UserScript==

    (function()
{
    var allLinks = document.links;

    if (allLinks != null)
	{
		for (i = 0; i <allLinks.length; ++i)
			{
				if (allLinks [i].href.indexOf ("www.subs-team.info/file") > 0)
				{
				allLinks [i].href = allLinks [i].href.replace ("www.subs-team.info/file", "www.subs-team.info/download");
				}
				}
	}
}
)();