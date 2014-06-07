<DIV><a href="+" onClick='javascript:ye_showLink(this); return false;'>Explore</a>

// ==UserScript==
// @name          Falcone Library @ Le Moyne College Lookup
// @namespace     http://www.lemoyne.edu/library/index.htm
// @description	  Search the Falcone Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Tristan Sabel for Le Moyne College Library Catalog, July 2006
// Modified by Steve Hunt for Santa Monica College Sirsi Catalog, May 2006
// Modified by David Waghalter, Dec 15, 2005
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://library.lemoyne.edu/search/Y?SEARCH=';  // The mimium search string for the Library
  var libraryName = 'Falcone Library @ Le Moyne College';	// what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check Falcone Library @ Le Moyne College
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



Powered By [Powered by Yahoo! Search]
<A>Userscripts.org - Universal Repository
<DIV><a href="http://siteexplorer.search.yahoo.com/search?ei=UTF-8&p=http%3A//userscripts.org/scripts/source/4073.user.js&bwm=p&bwms=p&searchbwm=Explore+URL">More Results...</a>