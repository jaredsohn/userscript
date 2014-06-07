// ==UserScript==
// @name           Re-Color names
// @namespace      rcn@kwierso.com
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    var names = getElementsByClass("hi");
    for(i=0;i<names.length;i++)
    {
        names[i].firstChild.style.color = "black";
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