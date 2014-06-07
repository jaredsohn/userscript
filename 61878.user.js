// Version 1.0
// (c) Sergei Stolyarov 
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           H1N1
// @namespace      http://regolit.com
// @description    Replaces occurences of words with another word
// @exclude        http://lleo.aha.ru/*
// @exclude        http://userscripts.org/*
// ==/UserScript==

(function()
{
	var textnodes = document.evaluate( 
	"//text()[normalize-space(.)!='']", 
	document, null,
    6, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	textnodes.snapshotItem(i).textContent = textnodes.snapshotItem(i).textContent
		.replace(/Гриппозный/g, "Идиотический")
		.replace(/гриппозной/g, "идиотической")
		.replace(/Гриппозной/g, "Идиотической")
		.replace(/грипп/g, "идиотизм")
		.replace(/Грипп/g, "Идиотизм");
}
})();