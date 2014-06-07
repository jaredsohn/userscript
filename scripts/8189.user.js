// ==UserScript==
// @name          IT Sligo Library Linky
// @description	  Search the Sefton Libraries (UK) Catalogue from Amazon book listings.
// @include       http://*.amazon.*

// Modified by Aine Meehan after Ben Hyland from original work after James Carpenter (http://www.userscripts.org/scripts/show/2339) after Carrick Mundell (http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/)
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
   	  pct_link.setAttribute('href', 'http://library.itsligo.ie/search/i?SEARCH=&sortdropdown=-);
   	  pct_link.setAttribute('title', 'Check to see if this book is available at IT Sligo Library');
   	  pct_link.innerHTML = '</br>Check IT Sligo Library Libraries';
      	
      header.parentNode.insertBefore(pct_link, header.nextSibling);
    }
  } 
}
)();