// ==UserScript==
// @name          Singapore National Library Lookup
// @namespace     http://www.nlb.gov.sg
// @description	  Search the Singapore National Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

//Modified by Chen Zhenzhi, Dec 17, 2005 (http://www.ninthjune.net)
// Modified by David Waghalter, Dec 15, 2005
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://vistaweb.nlb.gov.sg/cgi-bin/cw_cgi?10100+REDIRX+doSearch_3002_I_';  // The mimium search string for the Library
  var libraryName = 'Singapore National Library';	// what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var ISBN-10 = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check LAPL
  if (header) {       	
	  var link = document.createElement('a');
   	  link.setAttribute('href', libraryUrlPattern + isbn);
   	  link.setAttribute('title', libraryName);
   	  link.innerHTML 	= '<br/><strong>Lookup this book at the ' + libraryName + '</strong>' ;
   	  
     	  header.parentNode.insertBefore(link, header.nextSibling);
    	}
} 
}
)();

