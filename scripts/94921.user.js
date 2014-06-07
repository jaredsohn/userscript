/*
  GreaseMonkey userscript for making the news on Ynet more relevant.
  Inspired by http://room404.net/?p=37303

  Author:
    Ori Avtalion <ori@avtalion.name>

  Source:
    https://github.com/salty-horse/gm-scripts/blob/master/ynet-facebook.user.js

*/

// ==UserScript==
// @name          Ynet Facebooker
// @namespace     https://github.com/salty-horse/gm-scripts/blob/master/ynet-facebook.user.js
// @description   Make Ynet headlines more relevant to the modern age
// @include       http://www.ynet.co.il/home/*
// @include       http://www.ynet.co.il/articles/*
// ==/UserScript==

(function() {

var BRAND_WEBSITE = "בפייסבוק";

function addFacebook(str) {

	// Add word after another word starting with "ב" - doesn't yield good results
	//if (str.match(/\bב/) !== null) {
	//	// I hate dealing with hebrew in regexes
	//	return str.replace(/ ב[^,?:]*/, "$& " + BRAND_WEBSITE);
	//}

	// Replace text before question mark, period or comma
	if (str.match(/[?,.]/) !== null) {
		return str.replace(/([?,.])/, " " + BRAND_WEBSITE + "$1");
	}

	// Add before m-dash (actually hyphen character..)
	if (str.match(/ - /) !== null) {
		return str.replace(/ - /, " " + BRAND_WEBSITE + " - ");
	}

	// Add word at end of first quotation
	if (str.match(/".*"/) !== null) {
		return str.replace(/(^[^"]*"[^"]*)"/, "$1 " + BRAND_WEBSITE + "\"");
	}

	// Add before parentheses
	if (str.match(/\(/) !== null) {
		return str.replace(/\(/, BRAND_WEBSITE + " (");
	}

	// Nothing found? Tack at the end, before parentheses
	return str + " " + BRAND_WEBSITE;
}

var selectors;

if (window.location.href.indexOf("/articles/") !== -1) {
	selectors = [
		"h1.text20b",
		"span.text16g b",
		"td.text16 b",
		".text14 span p", // Doesn't match all paragraphs because Ynet doesn't use <p> correctly
		"h3.pHeader",
		".text13 div",
		"a.text12"
	];

} else {
	selectors = [
		"a.whtbigheader",
		"a.blkbigheader span",
		"a .text12",
		"a .text12w",
		"a.text12",
		"#CdaSlideShowMain1titlelink a",
		"#CdaSlideShowMain1titlesublink a",
		"a.blkbigheader",
		".smallheader",
		"font.text16 b"
	];
}

var elems = document.querySelectorAll(selectors.join(","));

var i;
for (i = 0; i < elems.length; ++i) {
	var elem = elems[i];

	if (elem.textContent.trim() !== "") {
		elem.textContent = addFacebook(elem.textContent.trim());
	}
}


})();