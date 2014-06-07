// ==UserScript==

// @name          Amazon GRPL Link
// @author        Karl Swedberg <http://www.englishrules.com/>
// modified from the Amazon KCLS  link by Sanjeev Narang <http://www.eConsultant.com/>
// @description	  Search the Grand Rapids Public Library (Lakeland) System.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
    var item_image = document.getElementById("prodImage");
    var item_title = item_image.getAttribute("alt");
  
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {           	
      var grpl_link = document.createElement('a');
   	  grpl_link.setAttribute('href', 'http://lakenet.llcoop.org/search/i' + isbn + '/i' + isbn + '/-2%2C0%2C0%2CE/frameset&FF=i' + isbn);
      grpl_link.setAttribute('title', 'Look up this book at the Grand Rapids Public (Lakeland) Library');
      grpl_link.setAttribute('style', 'font-weight: bold; color: #900; background-color:#fee; text-decoration: none; border-bottom: 1px dashed #900;');
   	  grpl_link.innerHTML 
	   	= '<br />GR Library ISBN Search: ' + isbn;
      header.parentNode.insertBefore(grpl_link, header.nextSibling);
    }
    if (item_title) {
      var item_image = document.getElementById("prodImage");
      var item_title = item_image.getAttribute("alt");
      var title_link = document.createElement('a');
   	  title_link.setAttribute('href', 'http://lakenet.llcoop.org/search/t?SEARCH=' + item_title + '&searchscope=1');
	    title_link.setAttribute('title', 'Look up this book by TITLE at the Grand Rapids Public (Lakeland) Library');
	    title_link.setAttribute('style', 'font-weight: bold; color: #090; background-color:#fee; text-decoration: none; border-bottom: 1px dashed #090;');
   	  title_link.innerHTML 
	   	= '<br />GR Library TITLE Search: ' + item_title + '<br />';
      header.parentNode.insertBefore(title_link, grpl_link.nextSibling);      
    }  
    
  } 
}
)();



