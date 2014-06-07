// ==UserScript==
// @name	YouTube Comment Quality Improver
// @namespace	frankusrs
// @description	Improves the average quality of YouTube comments
// @include	http://www.youtube.com/watch?*
// @include	https://www.youtube.com/watch?*
// @grant	none
// ==/UserScript==

var words = ['herp', 'derp', 'hurr', 'durr'];
var wlen = words.length;
var comments = document.getElementsByClassName("comment-text");

for (var i = 0, clen = comments.length; i < clen; i++) {
	var lines = comments[i].getElementsByTagName("p");

	for (var j = 0, llen = lines.length; j < llen; j++) {
		var commentWords = lines[j].innerHTML.split(" ");

		for (var k = 0, cwlen = commentWords.length; k < cwlen; k++)
			commentWords[k] = words[Math.floor(Math.random()*wlen)];

		lines[j].innerHTML = commentWords.join(" ");
	}
}
