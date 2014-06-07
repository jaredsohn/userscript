// ==UserScript==
// @name          District of Columbia (DC) Library Lookup
// @namespace     http://www.indiagram.com
// @description	  Search the District of Columbia's Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  // OpenWorldCat URL - http://www.google.com/search?ie=UTF-8&oe=UTF-8&domains=worldcatlibraries.org&sitesearch=worldcatlibraries.org&q=0521404894&btnG=Search
  var libraryUrlPattern = 'http://citycat.dclibrary.org/uhtbin/cgisirsi/x/0/0/123?library=ALL&searchdata1=';  // The mimium search string for the Library
  var libraryName = 'DC Public Library';	// what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check DC OPAC
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