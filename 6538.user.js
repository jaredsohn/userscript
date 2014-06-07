// ==UserScript==
// @name          Harborfields Public Library Catalog Lookup
// @namespace     http://harb.suffolk.lib.ny.us/
// @description	  Search the Harborfields Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Ryan Athanas, 11/28/2006
// Modified by Emily Clasper, 11/28/2006
// Modified by Ryan Singel, 10/19/2006
// Modified by David Waghalter, Dec 15, 2005 (los angeles library script)
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://alpha1.suffolk.lib.ny.us/search~S28/i?SEARCH=';  // To customize this for you library, change the scope number here.
  var libraryName = 'Harborfields Public Library Catalog';	// Insert your library's name in this line.
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check LAPL
  if (header) {       	
	  var link = document.createElement('a');
   	  link.setAttribute('href', libraryUrlPattern + isbn);
   	  link.setAttribute('title', libraryName);
   	  link.innerHTML 	= '<br/><strong>Look up this item in the ' + libraryName + '</strong>' ;
   	  
     	  header.parentNode.insertBefore(link, header.nextSibling);
    	}
} 
}
)();

