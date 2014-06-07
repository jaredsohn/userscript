// ==UserScript==
// @name        whatimg - add [img] tags
// @namespace   diff
// @include     https://whatimg.com/
// @include     https://whatimg.com/upload.php
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     0.2
// @grant       none
// ==/UserScript==

// using waitForKeyElements.js so this works with the drag'n'drop upload script: http://userscripts.org/scripts/show/105520

function doit() {
	var a = document.querySelector('textarea.input_field');
	var output = "";
	
	if (a) {
		var list = a.value.match(/(https?:\S*?\S\.(png|jpg|jpeg|gif))$/gim);
		for (i=0; i<list.length; i++) {
			output += "[img]" + list[i] + "[/img]\n";
		}
		
		a.value = a.value.replace(/^\s+(?=http)/gim, ""); // remove leading space from original links
		
		a.value += "\n[img] tags only:\n" + output;
	}
}

waitForKeyElements ("textarea.input_field", doit);