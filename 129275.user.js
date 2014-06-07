// ==UserScript==
// @name           Gizmodo Blog View
// @description    Replace gizmodo.com with blog.gizmodo.com
// @include 
// @version       1.0
// @history       1.0 Initial release       
// ==/UserScript==

// Variables
var url1 = "gizmodo.com";
var url2 = "blog.gizmodo.com";
var re = new RegExp(url1, "g");

// Check if it's google
function isGoogle(){
	return (window.location+"").indexOf("google") > -1;
}

// Call the replace function
replaceURL();

// If it's google, reload the replaceURL function each 100ms for the instant-search options
if(isGoogle()){
	window.setInterval(replaceURL,100);
} 

// Replace the urls function, if it's google, nuke the onmousedown function that is supposed to warn you
function replaceURL(){
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
        	if(re.test(links[i].href)){
				links[i].href = links[i].href.replace(url1,url2);
				if(isGoogle()){
					links[i].onmousedown = "";
				}
		}
	}
}