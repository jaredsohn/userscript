// ==UserScript==
// @name           SSW Optimal HP
// @namespace      http://www.secretsocietywars.com/crashnburn11
// @description    Adds Optimal HP Percentages to mouseover text
// @include        *secretsocietywars.com/index.php*
// ==/UserScript==

var full;
var drunk;
var val = document.evaluate('//td[contains(@class, "pattr") and contains(text(), "'+'CONSTITUTION'+'")]/following-sibling::td[1]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var cons = parseInt(val.data.replace(/,/g, ""));
var fda = GM_getValue("fda",6);
var oda = GM_getValue("oda",6);
var optimalf=Math.round(fda/(Math.floor(cons/1000)+10)*100);
var optimald=Math.round(oda/(Math.floor(cons/1000)+10)*100);

if(full = document.evaluate('//img[contains(@alt, "FULL!")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
}
else {
full = document.evaluate('//img[contains(@alt, "could eat")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
if(drunk = document.evaluate('//img[contains(@alt, "DRUNK!")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
}
else {
drunk = document.evaluate('//img[contains(@alt, "sober")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
var fullorig = full.alt;
var drunkorig = drunk.alt;
var drunksplit = drunkorig.split(" ");
var fullsplit = fullorig.split(" ");
var fulln = Math.round(parseInt(fullsplit[2])*(Math.floor(cons/1000)+10)/100);
var drunkn = Math.round(parseInt(drunksplit[2])*(Math.floor(cons/1000)+10)/100);
if (fullsplit[1] == "could") {
	fulln = 0;
}
if (drunksplit[2] == "sober") {
	drunkn = 0;
}
if (fullsplit[5] == "ALMOST") {
	fulln = Math.round(parseInt(fullsplit[0])*(Math.floor(cons/1000)+10)/100);
}
if (drunksplit[5] == "ALMOST") {
	drunkn = Math.round(parseInt(drunksplit[0])*(Math.floor(cons/1000)+10)/100);
}
if (fullsplit[4] == "STUFFED!") {
	fulln = Math.round(parseInt(fullsplit[0])*(Math.floor(cons/1000)+10)/100);
}
if (drunksplit[4] == "TOTALLY") {
	drunkn = Math.round(parseInt(drunksplit[0])*(Math.floor(cons/1000)+10)/100);
}
full.alt = fullorig + " (" + fulln + "/" + (Math.floor(cons/1000)+10) + ") ("+ optimalf + "% IS OPTIMAL FOR HP GAINS)";
full.title = full.alt;
drunk.alt = drunkorig + " (" + drunkn + "/" + (Math.floor(cons/1000)+10) + ") ("+ optimald + "% IS OPTIMAL FOR HP GAINS)";
drunk.title = drunk.alt;
full.addEventListener('contextmenu', optimalfull, false);
drunk.addEventListener('contextmenu', optimaldrunk, false);

function optimalfull() {
	fda=parseInt(prompt('What is your optimal fullness level?',GM_getValue("fda",6)));
	GM_setValue("fda",fda);
	optimalf=Math.round(fda/(Math.floor(cons/1000)+10)*100);
	full.alt = fullorig + " (" + fulln + "/" + (Math.floor(cons/1000)+10) + ") ("+ optimalf + "% IS OPTIMAL FOR HP GAINS)";
	full.title = full.alt;
}

function optimaldrunk() {
	oda=parseInt(prompt('What is your optimal drunkenness level?',GM_getValue("oda",6)));
	GM_setValue("oda",oda);
	optimald=Math.round(oda/(Math.floor(cons/1000)+10)*100);
	drunk.alt = drunkorig + " (" + drunkn + "/" + (Math.floor(cons/1000)+10) + ") ("+ optimald + "% IS OPTIMAL FOR HP GAINS)";
	drunk.title = drunk.alt;
}
