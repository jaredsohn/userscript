// ==UserScript==
// @name          Lexington (Kentucky) Public Library Lookup
// @description  Search the Lexington Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Jay Runner
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern = 'http://catalog.lexpublib.org/TLCScripts/interpac.dll?Search&FormID=0&Config=pac&LimitsId=0&StartIndex=0&SearchType=1&ItemsPerPage=50&Branch=0&SearchField=119&SearchData=';  // The mimium search string for the Library
  var libraryName = 'Lexington Public Library';	// what to Call the Library?
  mainmatch = document.title //window._content.location.href.match((/\/(\d{9}[\d|X])\//)
  str = mainmatch.substring(19,200);

  if (mainmatch){
  	var isbn = str
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

