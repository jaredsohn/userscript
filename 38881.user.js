// ==UserScript==
// @name           Remove Side Crap
// @namespace      rsc@kwierso.com
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

(function() {

    var sidebar = getElementByClass("sidebar");
    sidebar = sidebar[0];
    sidebar.style.display = 'none';
})();

function getElementByClass(theClass) 
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