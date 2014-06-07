// ==UserScript==
// @name        Tidy Up
// @namespace   Tidy up
// @description Tidies up the colours
// @include     http://movoda.net/index.html
// @include     http://movoda.net/index.html#
// @include     http://movoda.net/index.html?do=login
// @version     1
// ==/UserScript==

Tie = function () {}; // Just defining the object.

Tie.id = function (what) {
	// E.G: Tie.id("mainDiv").innerHTML = "Content";
	return document.getElementById(what);
}

Tie.alterDiv = function(where,what) {
	if (Tie.id(where)) {
		// Changes the inner html of a div/span/font/something with in ID tag.
		Tie.id(where).innerHTML = what;
	}
}

document.bgColor = "#333333";

Tie.id("chatin").style.backgroundColor = "black";
Tie.id("chatin").style.color = "pink";
Tie.id("chatin").style.border = "1px solid #333333";

Tie.id("chatbtn").style.backgroundColor = "black";
Tie.id("chatbtn").style.color = "pink";
Tie.id("chatbtn").style.border = "1px solid #333333";

Tie.id("servertime").style.backgroundColor = "black";
Tie.id("servertime").style.color = "pink";
Tie.id("servertime").style.border = "1px solid #333333";

Tie.id("popup").style.backgroundColor = "black";
Tie.id("popup").style.color = "pink";
Tie.id("popup").style.border = "1px solid #333333";

