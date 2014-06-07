/*
    Rewrite Google Image Search result, upgraded version compatible with Cooliris stuff
    links to point directly at the images
    Patrick Cavit, pcavit@gmail.com
    http://patcavit.com

    Upgraded by Martin Pecka, peci1@seznam.cz

    Copy, use, modify, spread as you see fit.
    Massive thanks go out to Eric Hamiter, this code
    is just a quick modification of his extension at
    http://roachfiend.com/
*/

// ==UserScript==
// @name          Google Image Relinker upgraded
// @description	  Rewrites Google Image Search links to point straight to the pictures, compatible with Cooliris stuff
// @include       http://images.google.*/*
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
   	var googLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]");
   
	for (var x=0; x<googLinks.length; x++) 
	{
		// Capture the stuff between the start and stop key strings.
		var gmatch = googLinks[x].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );
	
		// If it matched successfully...
		if (gmatch) 
		{
			// Set the link's onclick to the contents of the text captured in the regular expression's parenthesis.
			googLinks[x].setAttribute('onclick', "document.location.href='" + decodeURI(gmatch[1]) + "';return false;")

		}
	}
})();
