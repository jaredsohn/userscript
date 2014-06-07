// ==UserScript==
// @name Fix Sitelog
// @description Fixes annoying clearing of input fields on the sitelog page
// @namespace http://userscripts.org/scripts/steeri
// ==/UserScript==

// Hämta alla inputfält för inpasseringsinformation
var input = document.getElementsByClassName("inputtext");

// Loopa igenom samlingen med element och sätt varje
// elements onfocus-funktion till null
for (i = 0; i < input.length; i++) {
	input[i].setAttribute("onfocus", "");
	input[i].value = ""; // ta bort texten i rutorna
}