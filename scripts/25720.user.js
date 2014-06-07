// ==UserScript==
// @name           Craigslist Email Add URL
// @namespace      http://www.jrin.net/category/tips/greasemonkey
// @description    adds the URL to the body of the email when you click the mailto: links on craigslist listings
// @include        http://*.craigslist.org/*
// ==/UserScript==

window.setTimeout(function() { 

var as = document.getElementsByTagName('a');
count=0;
while (count<as.length){
	if (as[count].protocol == "mailto:"){
		as[count].href = as[count].href + "&body=" +document.baseURI;
	}
	count=count+1;
}
//} 


}, 60);







