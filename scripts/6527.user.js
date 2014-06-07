// ==UserScript==
// @name          Suffolk County Catalog Lookup
// @namespace     http://pals.suffolk.lib.ny.us/helpdesk
// @description	  Search the Suffolk County Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Emily Clasper, 11/28/2006 UPDATED 4/30/2007
// Modified by Ryan Singel, 10/19/2006
// Modified by David Waghalter, Dec 15, 2005 (los angeles library script)
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://alpha2.suffolk.lib.ny.us/search~S0/i?SEARCH=';  // The mimium search string for the Library
  var libraryName = 'Suffolk County Catalog';	// what to Call the Library?
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
