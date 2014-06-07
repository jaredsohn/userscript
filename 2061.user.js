// ==UserScript==
// @name          Loudon County, VA Library Lookup
// @namespace     http://www.indiagram.com
// @description	  Search the Loudon County (VA) Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://catalog.lcpl.lib.va.us/ipac20/ipac.jsp?session=0&menu=search&aspect=basic_search&npp=20&ipp=20&spp=20&profile=adm&ri=5&source=%7E%21horizon_public&index=ISBNE&x=6&y=13&aspect=basic_search&term=';  // The mimium search string for the Library
  var libraryName = 'Loudon County (VA) Library';	// what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check Loudon County OPAC
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