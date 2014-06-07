// ==UserScript==
// @name          Amazon TorPLib Linky
// @namespace     http://www.falsepositves.com
// @description	  Search the Toronto Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://hip.tpl.toronto.on.ca/ipac20/ipac.jsp?&index=ISBN&term=';  // The mimium search string for the Library
  var libraryName = 'Toronto Public Library';						     // what to Call the Library?
  mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
  
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {       	
	  var link = document.createElement('a');
   	  link.setAttribute('href', libraryUrlPattern + isbn);
   	  link.setAttribute('title', libraryName);
   	  link.innerHTML 	= '</br>Lookup this book at the ' + libraryName;
   	  
     	  header.parentNode.insertBefore(link, header.nextSibling);
    	}
    
  } 
}
)();
