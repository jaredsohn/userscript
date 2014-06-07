// ==UserScript==
// @name           Techmeme: wider
// @namespace      com.sweetleon
// @description    make Techmeme's content area wider
// @include        http://www.techmeme.com/
// ==/UserScript==


/* NEVERMIND: TechMeme has an option for making links open in a new window
for (var iLink in document.links) {
//if (!confirm('href:\t' + document.links[iLink].href + '\ntarg:\t' + document.links[iLink].target)) break;
	if (!document.links[iLink].target || document.links[iLink].target.toUpperCase() == "_SELF") {
		document.links[iLink].target = "_BLANK";
	}
//if (!confirm('href:\t' + document.links[iLink].href + '\ntarg:\t' + document.links[iLink].target)) break;
}
*/

for (var iSheets = 0; iSheets < document.styleSheets.length; iSheets++) {
	var theRules = new Array();
	if (document.styleSheets[iSheets].cssRules) theRules = document.styleSheets[iSheets].cssRules;
	else if (document.styleSheets[iSheets].rules) theRules = document.styleSheets[iSheets].rules;
	else alert('no rules');

	for (var iRules = 0; iRules < theRules.length; iRules++) {
		var theRule = theRules[iRules];
		switch (theRules[iRules].selectorText) {
			case "div.pagecont":
				theRule.style.maxWidth = '95%';
				break;
			case ".rpan":
				theRule.style.width = '22%';
				break;
			case ".mainpad":
				theRule.style.width = '75%';
				break;
			case ".ill":
				theRule.style.height = '4em';
				break;
			case ".relitems":
				theRule.style.marginBottom = '0.5em';
				break;
			case ".clus":
				theRule.style.padding = '0.25em';
		}
	}
}

/* from http://www.xulplanet.com/references/objref/CSSStyleRule.html
String cssText
readonly CSSRule parentRule
readonly CSSStyleSheet parentStyleSheet
String selectorText
readonly CSSStyleDeclaration style
readonly short type
*/