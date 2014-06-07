// ==UserScript==
// @name           Postini Warning Screen Accepter
// @namespace      http://www.chrisbeach.co.uk/
// @description    Automatically follows the "Accept" link to the site you wanted to browse to, skipping this mindless productivity hit
// @include        http://blocked.postini.com/alert*
// ==/UserScript==

var anchors = document.getElementsByTagName("a");
for ( var x in anchors ) {
	if ( anchors[x].innerHTML && anchors[x].innerHTML.trim() == "Accept" ) {
		anchors[x].innerHTML = "Accepted. Please wait";
		anchors[x].style.color = "#999999";
		document.location.href = anchors[x].href;
	}
}