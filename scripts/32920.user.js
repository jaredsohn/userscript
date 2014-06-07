// ==UserScript==
// @name           killmex
// @namespace      mex@kwierso.com
// @description    erases mex's posts
// @include        http://*.roosterteeth.com/forum/viewTopic.php*
// ==/UserScript==
(function()
{
	//this is the username that you want to hide. Change it to whomever you want.
	var username = "Mexcello";
	//this is the comment you want to replace all of that user's posts with
	var reason = "THIS POST HAS BEEN DELETED BECAUSE IT MIGHT CONTAIN \"Y\'ALL\".";
	
	
	var theClass = "comment";
	var allHTMLTags = new Array();
	var commentTags = new Array();
	var tableTags = new Array();
	var userTags = new Array();
	var aTags = new Array();
	var allcommentparents = new Array();
	var commentpostTags = new Array();

	
	//Create Array of All HTML Tags
	var allHTMLTags=document.getElementsByTagName('*');

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{

		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) 
		{
			commentTags.push(allHTMLTags[i]);
		}
	}
	for(i=0; i< commentTags.length; i++)
	{
		tableTags = commentTags[i].getElementsByTagName('table');
		for(j = 0; j < tableTags.length; j++)
		{
			if(tableTags[j].className == "user")
			{
				userTags = tableTags[j].getElementsByTagName('tr');
				aTags = userTags[2].getElementsByTagName('a');


				if(aTags[0].innerHTML.match(username) == username)
				{	

					allcommentparents = commentTags[i].getElementsByTagName('*');
					for(r = 0; r < allcommentparents.length; r++)
					{
						if(allcommentparents[r].className == "commentPost")
						{
							allcommentparents[r].innerHTML = "<i><b>" + reason + "</b></i>";
						}
					}
				}
				
			
			}
		}
	}
})();