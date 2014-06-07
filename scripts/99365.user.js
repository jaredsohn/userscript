// ==UserScript==
// @name           Reddit F7U12 Alt-Text Display
// @namespace      reddit_nav
// @description    Displays any alt-text from faces in the comments, eliminating the need to mouse over.
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/*
// ==/UserScript==

var posts = (function() {
	var divs = document.getElementsByTagName("div");
	var arr = new Array();
	var commentArea;
	for (var i in divs) {
		if (divs[i].className == "commentarea") 
			commentArea = divs[i];
	}
	divs = commentArea.getElementsByTagName("div");
	for (var i in divs) {
		if (divs[i].className == "md") 
			arr.push(divs[i]);
	}
	
	return arr;
})();

for (var i in posts) {
	var innerLinks = posts[i].getElementsByTagName("a");
	for (var j in innerLinks) {
		if (innerLinks[j].title && innerLinks[j].title != " ") {
			var content = posts[i].innerHTML.split("</a>");

			content[j] += "</a><span style='color: gray'> ["+innerLinks[j].title+ "]</span>";
			posts[i].innerHTML = content.join("");
		}	
	}
}