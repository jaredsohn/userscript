// ==UserScript==
// @name           Re-Color names (blue)
// @namespace      joey@jwvmods.com
// @include        http://rvb.roosterteeth.com/*
// @version        1.2
// ==/UserScript==

(function() {
    var names = getElementsByClass("hi");
    for(i=0;i<names.length;i++)
    {
        names[i].firstChild.style.color = '#1A539A';
    }
})();

function getElementsByClass(theClass)
{
    var allkeywordtags = new Array();
	//Create Array of All HTML Tags
	var allHTMLTags=document.getElementsByTagName("*");

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{
		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) 
		{
            allkeywordtags.push(allHTMLTags[i]);
		}
	}
    return allkeywordtags;
}