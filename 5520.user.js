// ==UserScript==

// @name          Amazon Kalamazoo Public Library link
// @author        Stewart Fritz (qwerty <at> monkey.org)
// modified from the Amazon GPRS link by Karl Swedberg <http://www.englishrules.com/>, which in turn modified the Amazon KCLS link by Sanjeev Narang <http://www.eConsultant.com/>
// @description	  Search the Kalamazoo Public Library catalog from an Amazon page.
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
   	  grpl_link.setAttribute('href', 'http://www.catalog.kpl.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1=' + isbn);
      grpl_link.setAttribute('title', 'Look up this book at the Kalamazoo Public Library');
      grpl_link.setAttribute('style', 'font-weight: bold; color: #900; background-color:#fee; text-decoration: none; border-bottom: 1px dashed #900;');
   	  grpl_link.innerHTML 
 	   	= '<br />Kalamazoo Public Library ISBN Search: ' + isbn;
      header.parentNode.insertBefore(grpl_link, header.nextSibling);
    }
    if (item_title) {
      var item_image = document.getElementById("prodImage");
      var item_title = item_image.getAttribute("alt");
      var title_link = document.createElement('a');
   	  title_link.setAttribute('href', 'http://www.catalog.kpl.gov/uhtbin/cgisirsi/x/0/0/5?searchdata1="' + item_title + '"{TI}');
	    title_link.setAttribute('title', 'Look up this book by TITLE at the Kalamazoo Public Library');
	    title_link.setAttribute('style', 'font-weight: bold; color: #090; background-color:#fee; text-decoration: none; border-bottom: 1px dashed #090;');
   	  title_link.innerHTML 
	   	= '<br />Kalamazoo Public Library TITLE Search: ' + item_title + '<br />';
      header.parentNode.insertBefore(title_link, grpl_link.nextSibling);      
    }  
    
  } 
}
)();





