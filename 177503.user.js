// ==UserScript==
// @name           Subreddit blocker
// @description    Hide selected subreddits from r/all
// @author         dusin
// @include        *reddit.com/r/all*
// @version        1.0
// ==/UserScript==



// ------------------EDIT HERE-----------------------
// Names of subreddits to be blocked. NOT case sensitive.
// Add/remove any number of values.

var blocked = ["trees", "leagueoflegends", "adviceanimals"];

// --------------------------------------------------


var taglines = document.getElementsByClassName("tagline");
var subname;


// iterate trough all items on the page:
for (var i = 0; i < taglines.length; i++)
{ 
	// get second <a> from element (link with subreddit it was posted to)	
	// and then string with subreddit name
	subname = taglines[i].getElementsByTagName("a")[1].innerHTML;
	
	// if the name of the subbredit is one of the blocked
	for (var j = 0; j < blocked.length; j++)
	{
		if (subname.toLowerCase() == blocked[j].toLowerCase())
		{
			// set current item as hidden
			taglines[i].parentNode.parentNode.style.display = 'none';
			break;			
		}	
	}	
}