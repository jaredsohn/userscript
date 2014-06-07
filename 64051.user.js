// ==UserScript==
// @name           ROT13
// @namespace      http://axisofevil.net/~xtina
// @description    Adds a menu item to translate to/from ROT13.
// @include        *
// ==/UserScript==

// Set the menu.
GM_registerMenuCommand("ROT13", rot13menu);

// The options window.
function rot13menu() {
	var rot13 = prompt("Paste the line here.\n\n");
	var result = translate(rot13);
	alert(rot13 + "\n\nbecomes\n\n" + result);
}

// The next two functions are pulled straight from:
// http://www.tornio.info/rot13.html
function rot13init() {
	var map = new Array();
	var s = "abcdefghijklmnopqrstuvwxyz";
	for (i=0; i<s.length; i++)
		map[s.charAt(i)] = s.charAt((i+13)%26);
	for (i=0; i<s.length; i++)
		map[s.charAt(i).toUpperCase()] = s.charAt((i+13)%26).toUpperCase();
	return map;
}

function translate(a) {
	var rot13map = rot13init();
	s = "";
	for (i=0; i<a.length; i++) {
		var b = a.charAt(i);
		s += (b>='A' && b<='Z' || b>='a' && b<='z' ? rot13map[b] : b);
	}
	return s;
}
