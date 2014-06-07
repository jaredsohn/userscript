// ==UserScript==
// @name           VNDB: Style Tweak
// @namespace      vndb
// @description    Tweaks the CSS for vndb.org
// @include        http://vndb.org/*
// @exclude        http://s.vndb.org/*
// @exclude        *jpg
// @exclude        *png
// @exclude        *gif
// @exclude        *js
// @exclude        *css
// ==/UserScript==

var html = '';
html = html + '* {font-family:Georgia; font-size:1.05em;}'; // make font more legible
html = html + '#maincontent div div p {line-height:1.6em;}';  // Add space between para lines
//html = html + 'body {background:#000000 url(http://i39.tinypic.com/2elcl1w.jpg) no-repeat scroll 0 0;}'; // Haruhi-sama
html = html + '#search {margin-top: 1.5em;}'; // too close to previous item

html = html + '#maincontent h1 {font-size:2.5em;margin-right: 25%;text-align:center;}'+
'#maincontent h2.alttitle {margin-right: 25%;text-align:center;}'; // page title shifted because of logo color clash

html = html + 'p.locked {color: #e93d71;}'; // Upstream patch for seinarukana skin

html = html + '.newly {background-color: gold;}'; // Background-color of new edits (seinarukana skin)

var htmlDiv = document.createElement("div");
htmlDiv.innerHTML = '<style type="text/css">' + html + '</style>';
document.body.insertBefore(htmlDiv, document.body.firstChild);


var classElements = [];

// To enable the following in Opera, add the following "require" directive in the script header:
// http://ajax.googleapis.com/ajax/libs/mootools/1.2.2/mootools.js
// This change is facultative.
if (window.$$)
{
	classElements = $$(".tc1_2")
	classElements.each(function(td){if(td.innerText == ".1")
		td.addClass("newly");
	});
}
else
{
	// Greasemonkey legacy
	var elts = document.getElementsByTagName('*');
	var eltLen = elts.length;
	var pattern = new RegExp("(^|\\s)tc1_2(\\s|$)");
	for (i = 0, j = 0; i < eltLen; i++) {
		if ( pattern.test(elts[i].className) ) {
			classElements[j] = elts[i];
			j++;
		}
	}

	eltLen = classElements.length;
	for (j = 0; j < eltLen; j++) {
		var match = false;
		if (classElements[j].textContent != undefined && classElements[j].textContent == ".1")
			match = true;
		else
		if (classElements[j].innerText != undefined && classElements[j].innerText == ".1")
			match = true;
		if (match) classElements[j].className += " newly";
	}

}


