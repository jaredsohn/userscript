// ==UserScript==
// @name           Strand Books Link from Amazon.com
// @namespace      http://userscripts.org/users/81393
// @author         Chuckdaddy; credit to Brian Short for original script and Daniel Holt for revised NYPL script
// @version        2.0 : 2-Jul-12
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
 		if (element.innerHTML.indexOf("<b>ISBN-10:</b>") == 0)
		{
 			 isbnLink = "<a href='http://www.strandbooks.com/index.cfm/fuseaction/search.results?advanced=1&searchString=&isbn=" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "%29%20%20&suppress=true&custom_edit=false" +"'><span style='font-size:1.15em; font-weight:800'>Find at Strand Books</span></a><br /><br />";
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