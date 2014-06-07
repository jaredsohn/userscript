// ==UserScript==
// @name           Google Mapmaker Blur Fix
// @namespace      hirak99
// @description    Fixes a bug in Firefox where MapMaker where text is blurred.
// @include        http://www.google.co.*/mapmaker?*
// @include        http://www.google.com/mapmaker?*
// ==/UserScript==

nsheets=document.styleSheets.length;
for (var i=0; i<nsheets; ++i) {
if (i==2) i=3;	// querying index 2 seems to cause some security error
nrules=document.styleSheets[i]['cssRules'].length;
for (var j=0; j<nrules; ++j) {
	if (document.styleSheets[i]['cssRules'][j].selectorText=='#page *') {
		//print(i+','+document.styleSheets[i]['cssRules'][j].cssText);
		document.styleSheets[i]['cssRules'][j].style['color']='';
		document.styleSheets[i]['cssRules'][j].style['text-shadow']='';
	}
}
}
