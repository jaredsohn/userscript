// ==UserScript==
// @name           NYPL Link from Amazon.com
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
 			 isbnLink = "<a href='http://leopac1.nypl.org/ipac20/ipac.jsp?menu=search&aspect=numeric&npp=10&ipp=20&spp=20&index=ISBN&term=" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "'><span style='font-size:1.15em; font-weight:800'>Find at the NYPL</span></a><br /><br />";
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
