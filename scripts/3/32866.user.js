// ==UserScript==

// @name           Remove Mod Titles

// @namespace      titles@kwierso.com

// @description    Removes RT Mod Titles. Maybe fixes page stretching caused by RTSE.

// @include        http://*.roosterteeth.com/members/journal/entry.php?*

// @include        http://*.roosterteeth.com/forum/viewTopic.php*

// @include        http://*.roosterteeth.com/members/comments/*

// @include        http://*.roosterteeth.com/viewEntry.php?*

// @include        http://*.roosterteeth.com/archive/episode.php?*

// @include        http://*.roosterteeth.com/media/viewItem.php?*

// @include        http://*.roosterteeth.com/members/journal/?*

// ==/UserScript==



(function()

{



getElementByClass('keyword');



}

)();









	var allHTMLTags = new Array();

	var titleTags = new Array();

	

    function getElementByClass(theClass) 

	{

		var holder;

		var allHTMLTags = new Array();

		var titleTags = new Array();

	    //Create Array of All HTML Tags

	    var allHTMLTags=document.getElementsByTagName('*');

	    //Loop through all tags using a for loop

	    for (i=0; i<allHTMLTags.length; i++) 

		{

		

		    //Get all tags with the specified class name.

		    if (allHTMLTags[i].className==theClass && allHTMLTags[i].innerHTML != "") 

			{

			    titleTags.push(allHTMLTags[i]);

		   	}

	    }

		

		for(i=0; i<titleTags.length; i++)

		{

			

			

			if( i > 0 && i < titleTags.length - 1)

			{

				holder = titleTags[i].innerHTML;

				

				

				//UNCOMMENT next line to add the Mod Total into a toolip!

							//titleTags[i].title = holder;

				///////////

				if(titleTags[i].innerHTML.search(/\<b\>\d{1,4}\<\/b\>/) == -1)

				titleTags[i].innerHTML = titleTags[i].innerHTML.split(" ")[0] + " " + titleTags[i].innerHTML.split(" ")[1];

			}

		}



    }