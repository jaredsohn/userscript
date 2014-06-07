// ==UserScript==
// @name           Find book at Queens Library
// @namespace      http://userscripts.org/users/137565
// @author         Chuckdaddy; credit to Brian Short for original script
// @version        1.0 : 2-Jul-12
// @include        http://*.amazon.com/*
// ==/UserScript==

all = document.getElementsByTagName('*');
var bodyElement;
var headingElement;
var title = "";
var isbnLink = "";
for (var i = 0; i < all.length; i++) {
    element = all[i];
 	if (element.nodeName == 'LI') {
 		if (element.innerHTML.indexOf("<b>ISBN-13:</b> 978-") == 0)
		{
 			 isbnLink = "<a href='http://www.queenslibrary.org/search/apachesolr_search?filters=sm_isbn:978" + element.innerHTML.replace("<b>ISBN-13:</b> 978-", "").replace(" ", "") + "'><span style='font-size:1.15em; font-weight:800'>Find at the Queens Library</span></a><br /><br />";
//			alert(isbnLink);

		}
 
    }
}
if (isbnLink != ""){
	for (var i = 0; i < all.length; i++) {
	    element = all[i];
		if (element.id == 'wishlist_btn_div_js'){
		//	alert("we found the one to replace");
			element.innerHTML =  isbnLink + element.innerHTML;
  	    }
	}
}