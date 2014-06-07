// ==UserScript==
// @name           Page Protector
// @namespace      #aVg
// @description    Double click to protect the page when you're, *ahem*, buying presents for someone, for example.
// @include        *
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var on = false, title;
document.addEventListener("dblclick", function() {
	on = !on;
	if(on) {
		title = document.title;
		document.title = "Error";
		document.body.style.display = "none";
	} else {
		document.title = title;
		document.body.style.display = "";
	}
}, false);