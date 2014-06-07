// ==UserScript==
// @name           Last 3 Pages
// @namespace      forest21
// @description    Adds links to the last three pages to a thread if it is a long thread 
// @include        http://www.ogboards.com/forums/forumdisplay.php?f=*
// ==/UserScript==

window.setTimeout(function(){
var multiPageArray = document.getElementsByTagName("span");
for(var i=0; i<multiPageArray.length; i++)
{
	var spanElement = multiPageArray[i];	
	if(spanElement.innerHTML.indexOf("Last Page")!=-1)
	{
		var pageLinks = spanElement.getElementsByTagName("a");
		var lastPage = pageLinks[pageLinks.length-1];
		lastPage.style.display="none";
		var lastPageLink = lastPage.href;
		var lastPageThread = lastPageLink.substring(lastPageLink.indexOf("?t=")+3,lastPageLink.indexOf("&"));
		var pages = lastPageLink.substring(lastPageLink.indexOf("page=")+5);
		for(var count = pages-2; count<=pages; count++)
		{
			var newPageLink = document.createElement("a");
			newPageLink.href = "showthread.php?t="+lastPageThread+"&page="+count;
			newPageLink.innerHTML = count;
			spanElement.insertBefore(newPageLink,lastPage);
			
			var space = document.createElement("span");
			space.innerHTML=" ";
			spanElement.insertBefore(space,lastPage);
		}
	}
}

},200);
