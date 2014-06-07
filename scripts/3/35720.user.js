// ==UserScript==
// @name           Remove Top Crap
// @namespace      RTC@kwierso.com
// @description    Removes Crap from the Top
// @include        http://*roosterteeth.com/*
// ==/UserScript==

(function()
{
	var top = getElementsByClass("projectsBar");
	top[0].parentNode.parentNode.parentNode.innerHTML = "";
})();

function getElementsByClass(theClass)
{
    var allHTMLTags=document.getElementsByTagName('*');
	var titleTags = new Array();
    for (i=0; i<allHTMLTags.length; i++) 
	{
	    if (allHTMLTags[i].className==theClass) 
		{
			titleTags.push(allHTMLTags[i]);
	    }
    }
	return titleTags;
}