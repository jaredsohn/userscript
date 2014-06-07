// ==UserScript==
// @name			Simple Google Navigation
// @namespace	   http://actuosus.ru/
// @description	 Navigation using Ctrl+arrow keys
// @include		 http://www.google.*
// @include		 http://images.google.*
// @include		 http://groups.google.*/groups?*
// @include		 http://groups.google.*/groups/search?*
// @include		 http://groups.google.*/group/*/search?*
// @include		 http://news.google.*
// @include		 http://video.google.*/videosearch?*
// @include		 http://scholar.google.*/scholar?*
// @include		 http://books.google.*/books?*
// @include		 http://catalogs.google.*/catalogs?*
// @include		 http://blogsearch.google.*/blogsearch?*
// ==/UserScript==

/*global,
	XPathResult
*/

function NavigateThrough (event)
{
	if (!document.getElementById) return;
 
	if (window.event) event = window.event;
 
	if (event.ctrlKey)
	{
		var link = null;
		var href = null;
		switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
		{
			case 0x25:
 				link = document.evaluate( "/html/body/table/tbody/tr/td[1]/a",
							document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
							.snapshotItem(0);
				break;
			case 0x27:
				link = document.evaluate( "/html/body/table/tbody/tr/td[last()]/a",
						document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
						.snapshotItem(0);
				break;
			case 0x26:
				// link = document.getElementById ('UpLink');
				break;
			case 0x28:
				// link = document.getElementById ('DownLink');
				break;
			case 0x24:
				href = '/';
				break;
		}
 
		if (link && link.href) document.location = link.href;
		if (href) document.location = href;
	}			
}

document.onkeydown = NavigateThrough;