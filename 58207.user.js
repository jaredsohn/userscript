// ==UserScript==
// @name           Facebook.com Remove Application Feeds from ALL News Feeds
// @description    Hides all third party applications from ALL feeds, even from friend's feeds
// @include        http://www.facebook.com/*
// @copyright      2009, Steve Beger, http://www.beger.com/remove-apps-from-facebook-newsfeed/
// @version        1.0.0
// ==/UserScript==

function disableAppsInNewsFeeds(obj)
{
	// Browser checking routine to determine DOM function works within object scope, end function if condition is true
	if(!obj || !obj.getElementsByClassName)
		return false;
		
	// Initialize user configurable variables
	var fbClass  = "UIIntentionalStory"; // DOM News class
	var fbPMatch = "/apps/application"; // Exlcusion matching
	
	// Initialize variables
	var fbFeeds = null;
	
	// Locate elements within class name
	if (fbFeeds = obj.getElementsByClassName(fbClass))
	{
		// Iterate through all news feeds
		for (var i = 0; i < fbFeeds.length; i++)
		{
			// Define offset as a variable
			var fbFeed = fbFeeds[i];
			
			// Pattern match for 
			if(fbFeed.innerHTML.match(fbPMatch))
					fbFeed.style.display = "none";		
		}
	}
}

// Call function on page load
disableAppsInNewsFeeds(document);

// Document Event listener to process incoming news feeds
document.addEventListener("DOMNodeInserted", function(ev) {	disableAppsInNewsFeeds(ev.target); }, false);

// Window Event listener to process disableAppsInNewsFeeds function upon page finish loading
window.addEventListener("load",	function() { disableAppsInNewsFeeds(document); }, false);

