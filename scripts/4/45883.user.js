// ==UserScript==
// @name ug - save the world
// @author w00t
// @include http://www.underground-gamer.com/savetheworld.php
// @version 0.1
// @description activate "get bonus" button in save the world page on underground-gamer tracker without click on previous buttons
// ==/UserScript==

function main() {
	for (x=1;x<=7;x++) {
		document.savetheworld.elements[x].disabled=false;
	}
}

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();