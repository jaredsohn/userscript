// ==UserScript==
// @name           ForumbaseX1
// @namespace      David Jo
// @include        http://www.computerbase.de/*
// ==/UserScript==

var images = document.getElementsByTagName("img");

for each (var img in images){
	title = img.getAttribute("title");
	if(title != null && title.indexOf("Benutzerbild") > -1){
		img.setAttribute("src", "");
	}
}