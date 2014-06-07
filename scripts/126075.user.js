// ==UserScript==
// @name           Show Me The Dubs!
// @namespace      4chandubs
// @description    Highlights doubles posts on 4chan
// @include        http://boards.4chan.org/*
// ==/UserScript==

function isDoubles(arg) {
	spl = arg.split("")

	//last two characters are the same
	if (spl[spl.length-1] == spl[spl.length-2]) {
		return true
	}
	else {
		return false
	}
}

var jsQuotes = new Array();
dubsCount = 0;
var postBlocks = document.getElementsByTagName("td");

for (var i=0; i<postBlocks.length; i++) {
	if (postBlocks[i].className == "reply" && isDoubles(postBlocks[i].id)) {
		postBlocks[i].style.background = "none repeat scroll 0 0 #FFE173"
		dubsCount++;
	}
}

document.getElementById("footer").innerHTML = "<b>"+dubsCount+
			" instances of doubles have been found on this page.</b><br />"+
			document.getElementById("footer").innerHTML;