// ==UserScript==
// @name           Basic Instructions Enhancer
// @namespace      http://freecog.net/2008/
// @description    Add "n"/"p" as shortcuts for next/previous comic.
// @include        http://basicinstructions.net/*
// ==/UserScript==

var nav = document.getElementById("menunav");
if (nav) {
	var targets = {};
	Array.forEach(nav.getElementsByTagName("span"), function(s) {
		if (s.className === "prev" || s.className === "next") {
			targets[s.className] = s.parentNode.href;
		}
	});
	window.addEventListener("keypress", function(e) {
		var c = String.fromCharCode(e.charCode);
		if (c === "b" || c === "p") {
			if (targets["prev"]) window.location.href = targets["prev"];
		} else if (c === "n") {
			if (targets["next"]) window.location.href = targets["next"];
		}
	}, false);
}
