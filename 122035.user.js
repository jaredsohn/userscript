// ==UserScript==
// @name           NYPL old from Amazon
// @namespace      NYPL old from Amazon
// @description    searches old NYPL catalog from Amazon
// @include        http://*.amazon.com/*
// ==/UserScript==
all = document.getElementsByTagName('*');var bodyElement;var headingElement;var title = "";var isbnLink = "";for (var i = 0; i < all.length; i++) {    element = all[i]; 	if (element.nodeName == 'LI') { 		if (element.innerHTML.indexOf("<b>ISBN-10:</b>") == 0)		{ 			 isbnLink = "<a href='https://catalog.nypl.org/search/i?SEARCH=" + element.innerHTML.replace("<b>ISBN-10:</b>", "").replace(" ", "") + "&sortdropdown=-&searchscope=1" +"'><span style='font-size:1.15em; font-weight:800'>Find with old NYPL catalog</span></a><br /><br />";//			alert(isbnLink);		}     }}if (isbnLink != ""){	for (var i = 0; i < all.length; i++) {	    element = all[i];		if (element.id == 'wishlist_btn_div_js'){		//	alert("we found the one to replace");			element.innerHTML =  isbnLink + element.innerHTML;  	    }	}}