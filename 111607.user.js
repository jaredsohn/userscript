 
// ==UserScript==
// @name           [Y-C-A] Smileys for facebook
// @namespace      Y-C-A
// @description    ADD smileys to FB
// @version			1.2
// @include        http://www.facebook.com/*
// @copyright		Che Yoh-ns Chah Asakura,2011
// @copyright		<yoh@asakura.jp>
// ==/UserScript==

var smileys;

smileys = {};


add(":zp:", ":zp:", "http://www.allo-image.net/stockimg/vignette/2611396444e5a8967e6880zurap.png");
add(":tr:", ":tr:", "http://www.allo-image.net/stockimg/vignette/2803745284e5a89800e2e9troll.png");

function main() {
	var key;
	for (key in smileys) {
		document.body.innerHTML = document.body.innerHTML.replace(new RegExp(key, "g"), smileys[key]);
	}
}

window.setTimeout(main, 1000);
