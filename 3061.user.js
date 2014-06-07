// ==UserScript==
// @name          Pasadena  Public Library Lookup
// @namespace     http://catalog.pasadenapubliclibrary.net
// @description	  Search the Pasadena Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by David Potter, Jan 30, 2006  (munged from LA public library to Pasadena)
// Modified by David Waghalter, Dec 15, 2005
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://catalog.pasadenapubliclibrary.net/ipac20/ipac.jsp?menu=search&aspect=numeric&npp=10&ipp=20&spp=20&profile=pcent&ri=&index=ISBNEX&term='  ;
  var libraryUrlSuffix = '&x=0&y=0&aspect=numeric';
  var libraryName = 'Pasadena Public Library';	// what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check LAPL
  if (header) {       	
	  var link = document.createElement('a');
   	  link.setAttribute('href', libraryUrlPattern + isbn+libraryUrlSuffix);
   	  link.setAttribute('title', libraryName);
   	  link.innerHTML 	= '<br/><strong>Lookup this book at the ' + libraryName + '</strong>' ;
   	  
     	  header.parentNode.insertBefore(link, header.nextSibling);
    	}
} 
}
)();
