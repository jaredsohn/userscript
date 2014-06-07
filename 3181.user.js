// ==UserScript==
// @name          Amazon Providence Public Library Linky
// @namespace     http://www.heightslibrary.org
// @description	  Search the Providence Public Library from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
      var mcpl_link = document.createElement('a');
   	  mcpl_link.setAttribute('href', 'http://library.provlib.org/search/i?SEARCH=' + isbn + '&searchscope=1');


	  mcpl_link.setAttribute('title', 'Lookup this book at Providence Public Library');
	  mcpl_link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');
   	  mcpl_link.innerHTML 
	   	= '</br><h3>Lookup this book at Providence Public Library</h3>';

      /*var powells_link = document.createElement('a');
   	  powells_link.setAttribute('href', 'http://www.powells.com/biblio/' + isbn);
	  powells_link.setAttribute('title', 'Lookup this book at Powells City of Books');
	  powells_link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');
   	  powells_link.innerHTML 
	   	= '</br>Lookup this book at Powells City of Books';*/
		
		
      	
      header.parentNode.insertBefore(mcpl_link, header.nextSibling);
      header.parentNode.insertBefore(powells_link, header.nextSibling);
    }
 } 
}
)();


