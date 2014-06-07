// ==UserScript==
// @name           Queens Library Link from Amazon.com
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
			
 			 isbnLink = "<a href='http://iportal.queenslibrary.org/cgi-bin/gw/chameleon?&u1=7&op1=AND&submit=Search&host=qils.admin.root.queenslibrary.org+9901+DEFAULT&sessionid=2009011016093328596&skin=qbpl&&inst=consortium&submittheform=&usersrch=1&beginsrch=1&elementcount=3&function=INITREQ&search=KEYWORD&rootsearch=KEYWORD&lng=en&&pos=1&conf=./chameleon.conf&t1=" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "'><span style='font-size:1.15em; font-weight:800'>Find at the Queens Library</span></a><br /><br />";
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
