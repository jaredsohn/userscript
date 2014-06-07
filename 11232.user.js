// ==UserScript==
// @name           Open Google Links in New Tab
// @description Will open all links within the results pages of Google in a new tab.
// @namespace      com.theredheadproject.google
// @include        http://www.google.com/search?q=*
// ==/UserScript==

function makeBlanks() {
	var tags = new Array();
	
	tags = document.getElementById("res").getElementsByTagName("a");
	
	for (var i = 0; i < tags.length; i++ )
		if (tags[i].id = "l" )
			tags[i].target = "_BLANK";
			
	tags = document.getElementById("navbar").getElementsByTagName("a");
	for (var i = 0; i < tags.length; i++)
		if (tags[i].id = "l")
			tags[i].target = "";
}
makeBlanks();