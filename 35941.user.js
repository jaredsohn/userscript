// ==UserScript==
// @name           fixwidth
// @namespace      fw@kwierso.com
// @include        http://*.roosterteeth.com/members/journal*
// @include        http://www.roosterteeth.com/members/images/image.php*
// @include        http://www.roosterteeth.com/members/comments/*
// ==/UserScript==

(function() 
{
	var pagecontentelement = document.getElementById("pageContent");
	pagecontentelement.style.background = "#F2F2F2";
	var content = getElementByClass('content');
	content.childNodes[1].style.background = "#EAEDF0";
	content.childNodes[1].setAttribute('width','750');
	content.childNodes[1].setAttribute('border','1px');
	content.childNodes[1].setAttribute('borderColor','lightGrey');
})();

function getElementByClass(theClass) 
{
	var allHTMLTags = new Array();
	var titleTags = new Array();
	//Create Array of All HTML Tags
	var allHTMLTags=document.getElementsByTagName('*');
	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{
	//Get all tags with the specified class name.
	if (allHTMLTags[i].className==theClass) 
	{
		titleTags.push(allHTMLTags[i]);
	}
	}
	return titleTags[0];
	
}