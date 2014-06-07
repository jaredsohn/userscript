/*
    GameTrailers Link Rewriter
    Chris Wood (userscripts at gracefool.com)

    Public Domain - Copy, use, modify, spread...
    Thanks to the scripts I used as a basis for this:
    Patrick Cavit (Google Image Relinker)
    LRWD (ThemeXP.org Link ReWriter)
*/

// ==UserScript==
// @name          GameTrailers Link Rewriter
// @namespace     http://gracefool.com
// @description	  Rewrites GameTrailers links to point straight to the download page
// @include       http://www.gametrailers.com/*
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
	
	// Get a list of all A tags that have an href attribute containing the start and stop key strings.
   	var links = selectNodes(doc, doc.body, "//A[contains(@href,'/player.php?id=')][contains(@href,'&type=')]");
   
	for (var x=0; x<links.length; x++) 
	{
		// Capture the stuff between the start and stop key strings.
		var gmatch = links[x].href.match( /\/player\.php\?id\=(\d+)\&type\=/ );
		//var gmatch = links[x].href.match( /^http:\/\/(.*?)\.gametrailers\.com\/player\.php\?id\=(\d+)\&type\=/i );
	
		// If it matched successfully...
		if (gmatch) 
		{
			// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
			links[x].href = "http://www.gametrailers.com/downloadnew.php?id=" + gmatch[1];
			//links[x].href = "http://" + gmatch[1] + ".gametrailers.com/downloadnew.php?id=" + gmatch[2];
		}
	}
})();