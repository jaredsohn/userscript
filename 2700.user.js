/*
    Use links to box scores instead of game recaps
    for completed games under "My Team" in Yahoo!
    Fantasy basketball.

    Copy, use, modify, spread as you see fit.

    Based on Pat Cavit's Google Image Relinker
*/

// ==UserScript==
// @name          Yahoo! Box Scorer 0.1
// @namespace     http://userscripts.org/people/3630
// @description	  Rewrites Yahoo! Fantasy basketball "My team" page links to point to game box scores instead of recaps.
// @include       http://basketball.fantasysports.yahoo.com/*
// ==/UserScript==

(function() 
{
	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	doc = window.document;
	
	// Get a list of all A tags that have an href attribute containing the recap string.
   	var recapLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/nba/recap?gid=')]");
   
	for (var x=0; x<recapLinks.length; x++) 
	{
		// Capture the game id.
		var gameid = recapLinks[x].href.match( /\/nba\/recap\?gid\=(.*)/ );
	
		// If it matched successfully...
		if (gameid) 
		{
			// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
			recapLinks[x].href = ('http://sports.yahoo.com/nba/boxscore?gid='+gameid[1]);
		}
	}
})();