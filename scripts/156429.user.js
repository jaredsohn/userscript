// ==UserScript==
// @name        Nordea.se: Lagad kodinmatning
// @namespace   http://theorin.net
// @description Löser problem med fältet för kodinmatning: 1) det blir aldrig dubbla mellanslag 2) sista siffran ignoreras aldrig 3) man kan alltid sudda senaste skrivna siffran med backspace.
// @downloadURL http://userscripts.org/scripts/source/156429.user.js
// @updateURL   http://userscripts.org/scripts/source/156429.user.js
// @include     https://*.nb.se/*
// @include     https://*.nordea.se/*
// @include     https://*.plusgirot.se/*
// @grant       GM_log
// @version     1.3
// ==/UserScript==

function main() {
	inputs = document.getElementsByTagName("input");
	for (i = 0; i < inputs.length; i++)
	{
		var input = inputs[i];
		if (input.getAttribute("onkeyup") == "red_input();") {
			input.removeAttribute("onkeyup");
			GM_log("Success: Removed onkeyup");
		}
		if (input.getAttribute("onkeypress") == "setPrev();") {
			input.removeAttribute("onkeypress");
			GM_log("Success: Removed onkeypress");
		}
	}
}

main();
