// ==UserScript==
// @name           NYPL new from Amazon
// @namespace      NYPL new from Amazon
// @description    searches new BiblioCommons interface from Amazon
// @include        http://*.amazon.com/*
// ==/UserScript==
all = document.getElementsByTagName('*');var bodyElement;var headingElement;var title = "";var isbnLink = "";for (var i = 0; i < all.length; i++) {    element = all[i]; 	if (element.nodeName == 'LI') { 		if (element.innerHTML.indexOf("<b>ISBN-10:</b>") == 0)		{ 			 isbnLink = "<a href='http://nypl.bibliocommons.com/search?custom_query=Identifier:%28" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "%29%20%20&suppress=true&custom_edit=false" +"'><span style='font-size:1.15em; font-weight:800'>Find with new NYPL catalog</span></a><br /><br />";//			alert(isbnLink);		}     }}if (isbnLink != ""){	for (var i = 0; i < all.length; i++) {	    element = all[i];		if (element.id == 'wishlist_btn_div_js'){		//	alert("we found the one to replace");			element.innerHTML =  isbnLink + element.innerHTML;  	    }	}}