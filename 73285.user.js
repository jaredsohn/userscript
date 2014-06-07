// ==UserScript==
// @name           last.fm heartchange
// @namespace      lastfm.de
// @include        http://www.lastfm.*
// @author         scaranox
// ==/UserScript==

	var image_url = "http://i44.tinypic.com/t9d1fa.png"; //<--here goes the link with the new icon
	
	var image_width = "15"; 
	//picture width
	
	var image_height = "15"; 
	//picture height


    /* getElementByClass
    /**********************/
	
    var allHTMLTags = new Array();

    function getElementByClass(theClass) 
	{
		
		//Create Array of All HTML Tags
		var allHTMLTags=document.getElementsByTagName("*");
		
		//Loop through all tags using a for loop
		for (i=0; i<allHTMLTags.length; i++) 
		{

			//Get all tags with the specified class name.
			if (allHTMLTags[i].className==theClass) 
			{
				allHTMLTags[i].style.backgroundImage = "none";
				allHTMLTags[i].src = image_url;
				allHTMLTags[i].width = image_width;
				allHTMLTags[i].height = image_height;
				
			}
		}
    }
	
	getElementByClass("icon loved_indicator_icon");
	
	
	