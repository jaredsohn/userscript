// ==UserScript==
// @name          Amazon CPL Linky
// @namespace     
// @description	  Search the Calgary Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
            	
      var spl_link = document.createElement('a');
   	  spl_link.setAttribute('href', 'http://catalogue.calgarypubliclibrary.com/ipac20/ipac.jsp?&index=ISBNEX&term=' + isbn);
   	  spl_link.setAttribute('title', 'Lookup this book at the Calgary Public Library');
   	  spl_link.innerHTML 
	   	= '</br>Lookup this book at the Calgary Public Library';
      	
      header.parentNode.insertBefore(spl_link, header.nextSibling);
    }
  } 
}
)();