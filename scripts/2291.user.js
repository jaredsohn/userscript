// ==UserScript==

// @name          Amazon KCLS Link
// @author        Sanjeev Narang <http://www.eConsultant.com/>
// @namespace     http://www.eConsultant.com/greasemonkey/
// @description	  Search the King County Library System (around Seattle WA).
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
            	
      var mcpl_link = document.createElement('a');
   	  mcpl_link.setAttribute('href', 'http://catalog.kcls.org/search/i?' + isbn + '&searchscope=1&SORT=D');
	  mcpl_link.setAttribute('title', 'Lookup this book at the King County Library System');
	  mcpl_link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');
   	  mcpl_link.innerHTML 
	   	= '</br>Lookup this book at the King County Library System';
      header.parentNode.insertBefore(mcpl_link, header.nextSibling);
    }
  } 
}
)();
