// ==UserScript==
// @name           Tumblr Potty Mouth
// @namespace      benmcmath.com
// @description    Cleans up all the F***yeah links so you don't have to read the bad word
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

function clean_tumblr(){
	var all_links = document.getElementsByTagName('a');
	for(var i=0; i<all_links.length; i++) {
		if(all_links[i].innerHTML.toLowerCase().indexOf("fuck") >= 0) {
			all_links[i].innerHTML = all_links[i].innerHTML.toLowerCase().replace("fuck", "f***");
		}
	}
	//setInterval(clean_tumblr, 200);
}
setInterval(clean_tumblr, 200);