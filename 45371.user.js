// ==UserScript==
// @name           Amazon.com to Brooklyn Public Library
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
 			 isbnLink = "<a href='http://catalog.brooklynpubliclibrary.org/search~/a?searchtype=i&searcharg=" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "'><span style='font-size:1.15em; font-weight:800'>Brooklyn Public Library</span></a><br /><br />";
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
