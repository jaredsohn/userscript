// ==UserScript==
// @name          Sefton Library Linky
// @description	  Search the Sefton Libraries (UK) Catalogue from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Ben Hyland from original work after James Carpenter (http://www.userscripts.org/scripts/show/2339) after Carrick Mundell (http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/)
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org).
//This should work for any Viewpoint library catalogue, commonly used in the UK. Just change the URL.
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
            	
      var pct_link = document.createElement('a');
   	  pct_link.setAttribute('href', 'http://www.catalogue.sefton.gov.uk/cgi-bin/viewpoint_server.sh?enqtype=ISBNTITLE&enqpara1=query&catsect=BOOKS&authpara1=' + isbn);
   	  pct_link.setAttribute('title', 'Check to see if this book is available at Sefton Libraries');
   	  pct_link.innerHTML = '</br>Check Sefton Libraries';
      	
      header.parentNode.insertBefore(pct_link, header.nextSibling);
    }
  } 
}
)();


