// ==UserScript==
// @name           Last 3 Pages - OGBoards.com
// @namespace      Forest
// @description    Adds links to the last three pages to a thread if it is a long thread 
// @include        http://www.ogboards.com/forums/forumdisplay.php*
// ==/UserScript==

var lastNPages = 3;

var spanElements = document.getElementsByTagName("span");
for(var i=0; i<spanElements.length; i++)
{
	var current = spanElements[i];	
	
	if(current.innerHTML.indexOf("Last Page")!=-1)
	{
		var pageLinks = current.getElementsByTagName("a");
		
		var lastPage = pageLinks[pageLinks.length-1];
		lastPage.style.display="none";
		
		var lastPageLink = lastPage.href;
		var lastPageThread = lastPageLink.substring(lastPageLink.indexOf("?t=")+3,lastPageLink.indexOf("&"));
		
		var pages = lastPageLink.substring(lastPageLink.indexOf("page=")+5);
		
		var previousPage = pageLinks[pageLinks.length-2];
		var previousPageNumber = previousPage.href.substring(previousPage.href.indexOf("page=")+5);
		
		var count = pages - lastNPages + 1;
		
		if(count <= previousPageNumber)
			count = parseInt(previousPageNumber) + 1;
			
		for(; count <= pages; count++)
		{
			var newPageLink = document.createElement("a");
			newPageLink.href = "showthread.php?t="+lastPageThread+"&page="+count;
			newPageLink.innerHTML = count;
			current.insertBefore(newPageLink,lastPage);
			
			if(count != pages)
			{
				var space = document.createElement("span");
				space.innerHTML=" ";
				current.insertBefore(space,lastPage);
			}
		}
	}
}