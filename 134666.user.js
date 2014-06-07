// ==UserScript==
// @name			jQuery Everywhere
// @description		Includes jQuery everywhere, have fun you crazy kids!
// @include 		*.*
// ==/UserScript==

var magic=function() {
	if (document.head) {
		var head = document.head;
		if ("item" in head) {
			if (!head[0]) {
				setTimeout(magic, 25);
				return;
			}
			head = head[0];
		}
		var scriptElem = document.createElement("script");
		scriptElem.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
		head.insertBefore(scriptElem, head.firstChild);
	} else {
		setTimeout(magic, 500);
	}
};magic();