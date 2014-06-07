// ==UserScript==
// @name           WorldCat Link for Amazon.com
// @namespace      http://bshort.org/code/greasemonkey/
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
			 
 			 isbnLink = "<a href='http://www.worldcat.org/search?qt=advanced&q=isbn%3A" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "'><span style='font-size:1.15em; font-weight:800'>Find at WorldCat</span></a><br /><br />";
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
