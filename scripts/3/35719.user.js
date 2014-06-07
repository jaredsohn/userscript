// ==UserScript==
// @name           Remove Empties
// @namespace      RE@kwierso.com
// @description    Remove blocked forums from forum list.
// @include        http://delta.roosterteeth.com/forum/
// ==/UserScript==

(function()
{
    var allHTMLTags=document.getElementsByTagName('*');
	var titleTags = new Array();
    for (i=0; i<allHTMLTags.length; i++) 
	{
	    if (allHTMLTags[i].className=="content") 
		{
			titleTags.push(allHTMLTags[i]);
	    }
    }
	var holder = new Array();
	for(i=2; i<titleTags.length; i++)
	{
		if(titleTags[i].innerHTML.search(/<b><\/b>/) != -1)
		{
			holder.push(i);
		}
	}
	var placeholder;
	var nothingboxes = getElementsByClass("nothing", holder);
	var x;
	for(i=0;i<holder.length;i++)
	{
		nothingboxes[holder[i]-2].parentNode.parentNode.removeChild(nothingboxes[holder[i]-2].parentNode);
	}
})();

function getElementsByClass(theClass, p)
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