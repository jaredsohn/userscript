/*
    Rewrite Google Blog Search result
    links to point directly at the results
    Vivek Jishtu, mailme@vasacorp.com
    http://viamatic.com/firefox    

    This code was originally Rewrite Google Image Search 
    result by Patrick Cavit, pcavit@gmail.com
    http://patcavit.com
    I have just converted it to work with 
    Google Blog Search     

    Copy, use, modify, spread as you see fit.
    Massive thanks go out to Eric Hamiter, this code
    is just a quick modification of his extesion at
    http://roachfiend.com/
*/

// ==UserScript==
// @name          Blogsearch Relinker (Google)
// @namespace     http://viamatic.com/firefox
// @description	  Rewrites Google Blog Search links to point straight to the blogs
// @include       http://blogsearch.google.*/*
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
   	var googLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/url?sa=D&q=')][contains(@href,'&q=')]");
   
	for (var x=0; x<googLinks.length; x++) 
	{
		// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
		
		googLinks[x].href = googLinks[x].href.replace("http://www.google.com/url?sa=D&q=", "");
	}
})();