// Amazon PDX Linky Greasemonkey User Script
//
// Version 1
// 2005/09/18
// Original version
//
// Version 1.1
// 2005/12/15
// Modifed to run in Firefox 1.5 GM 0.6.4
// thanks to Michael Hall
// Added the comments here and above
//
// ==UserScript==
// @name          Amazon PDX Linky
// @namespace     http://www.aracnet.com/~jmills
// @description	  Search the Multnomah County Public Library Catalog or Powells from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
            	
      var mcpl_link = document.createElement('a');
   	  mcpl_link.setAttribute('href', 'http://catalog.multcolib.org/search/i?SEARCH=' + isbn + '&searchscope=1&submit=Submit');
	  mcpl_link.setAttribute('title', 'Lookup this book at the Multnomah County Public Library');
	  mcpl_link.setAttribute('style', 'font-weight: bold; color: #F00; border: thin dashed blue;');
   	  mcpl_link.innerHTML 
	   	= '</br>Lookup this book at the Multnomah County Public Library';

      var powells_link = document.createElement('a');
   	  powells_link.setAttribute('href', 'http://www.powells.com/biblio/' + isbn);
	  powells_link.setAttribute('title', 'Lookup this book at Powells City of Books');
	  powells_link.setAttribute('style', 'font-weight: bold; color: #F00; border: thin dashed blue;');
   	  powells_link.innerHTML 
	   	= '</br>Lookup this book at Powells City of Books';
		
		
      	
      header.parentNode.insertBefore(mcpl_link, header.nextSibling);
      header.parentNode.insertBefore(powells_link, header.nextSibling);
    }
  } 
}
)();
