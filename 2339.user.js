// ==UserScript==
// @name          Amazon Madigan Library Linky
// @namespace     http://www.pct.edu/library
// @description   Search the Madigan Library Catalog from Amazon book listings.
// @include       http://*.amazon.*

// Modified by James Carpenter
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
        var isbn = mainmatch[1];
        var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
               
      var pct_link = document.createElement('a');
          pct_link.setAttribute('href', 'http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/123?searchdata1=' + isbn + '&srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase');
          pct_link.setAttribute('title', 'Check to see if this book is available at the Madigan Library');
          pct_link.innerHTML = '</br><h3>Check to see if this book is available at the Madigan Library</h3>';
        
      header.parentNode.insertBefore(pct_link, header.nextSibling);
    }
  } 
}
)();
