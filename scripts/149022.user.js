// ==UserScript==
// @name        lowbird hotkeys
// @namespace   *
// @include     http://www.lowbird.com/all/*
// @include     http://www.lowbird.com/user/*
// @version     1
// ==/UserScript==

window.onkeypress = function(event) {

	var k = event.charCode;

	if(event.target.id != "q" && event.target.id != "tagText" && event.target.name != "content") {
		if(k == 106) {
			location.href = document.getElementById("prevBar").href;
		} else if(k == 107) {
			location.href = document.getElementById("nextBar").href;
		} else if(k == 104) {
			location.href = "http://www.lowbird.com";
		} else if(k == 105) {
			document.getElementById("image").width -= 50;
		} else if(k == 108) {
			scroll(2);
		} else if(k == 111) {
			scroll(-2);
		} else if(k == 117) {
			document.getElementById("image").width += 50;
		} else if(k == 122) {
			if(document.getElementById("image").classList.contains("full")) {
				swap(document.getElementById("image"), 'full', 'scaled')
			} else {
				swap(document.getElementById("image"), 'scaled', 'full')
			}
		} else if(k == 49) {
			document.getElementById("userRating").children[0].click();
		} else if(k == 50) {
			document.getElementById("userRating").children[1].click();
		} else if(k == 51) {
			document.getElementById("userRating").children[2].click();
		} else if(k == 52) {
			document.getElementById("userRating").children[3].click();
		} else if(k == 53) {
			document.getElementById("userRating").children[4].click();
		}
	}
}
document.getElementsByClassName("teaser").item(0).children[0].innerHTML = "";

setTimeout(scroll, 400);

function scroll(f) {
	f = typeof f == "undefined" ? 1 : f;
	window.scrollBy(0, 85 * f); 
}