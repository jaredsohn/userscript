// ==UserScript==
// @name          Amazon SPL Linky
// @namespace     http://www.mundell.org
// @description	  Search the Seattle Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
            	
      var spl_link = document.createElement('a');
   	  spl_link.setAttribute('href', 'http://catalog.spl.org/ipac20/ipac.jsp?&index=ISBNEX&term=' + isbn);
   	  spl_link.setAttribute('title', 'Lookup this book at the Seattle Public Library');
   	  spl_link.innerHTML 
	   	= '</br>Lookup this book at the Seattle Public Library';
      	
      header.parentNode.insertBefore(spl_link, header.nextSibling);
    }
  } 
}
)();
