/*
 * the thumbnails have the form ..../xnxx0001.jpg and the real 
 * images are in the form .../0001.jpg
 * This script links the real image to the page
 */

// ==UserScript==
// @name          XNXX Image Relinker
// @namespace     http://scharf.gr/greasemonkey
// @description	  Links directly to the xnxx image (instead of a page containing the image)
// @include       http://galleries.xnxx.com/*
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
   var links = selectNodes(doc, doc.body, "//img");
   
   var re = new RegExp("[a-zA-Z]+([0-9]+.jpg)", "g");
   for (var x=0; x<links.length; x++) 
     {
       // replace the containing href with the image
       links[x].parentNode.href = links[x].src.replace(re,"$1");
     }
 })();
