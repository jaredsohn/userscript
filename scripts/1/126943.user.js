// ==UserScript==
// @name           phpBB opener
// @namespace      Catfood
// @include        http://*/search.php?search_id=newposts*
// @include        https://*/search.php?search_id=newposts*
// @include        http://*/search.php?&sr=topics&search_id=newposts&start=*
// @include        https://*/search.php?&sr=topics&search_id=newposts&start=*
// ==/UserScript==


	var links = document.getElementsByTagName("a");

	for (i = 0; i < links.length; i++)
		{
			if (links[i].hasAttribute("href") && links[i].href.indexOf("unread#unread") > 0)
				{
					var odkaz = "";
					odkaz = links[i].href;					
					window.open(odkaz);
				}
		}