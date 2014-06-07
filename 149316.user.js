// ==UserScript==
// @name        Curse
// @namespace   davidcraig.eu
// @include     http://www.curse.com
// @version     1
// ==/UserScript==

// Removes the body classes
b = document.body;
b.className = "";
b.classList = "";

// if WoW then give wow class
p = window.location.pathname;
if (p.match("wow")) {
	b.className = "game-wow";
}