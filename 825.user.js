// ==UserScript==
// @name          MW Definition Extractor
// @namespace     http://rfitz.sytes.net/
// @description	  Extracts a word's definition from its Merriam-Webster page.
// @include       http://www.m-w.com/cgi-bin/dictionary*
// ==/UserScript==

(function(){

var tables=document.getElementsByTagName('table');

var i=0;
while (!(tables[i].width=="400")) {
	i++;
}

tables[i].setAttribute("cellspacing","10");

var div=document.createElement("div");
div.appendChild(tables[i]);

document.getElementsByTagName("body")[0].setAttribute("bgcolor","#ffffff");
document.getElementsByTagName("body")[0].replaceChild(div,document.getElementsByTagName("div")[0]);

})();