// ==UserScript==
// @name           bayimg.com - Add Direct Link to Image
// @namespace      Manix
// @include        http://bayimg.com/*
// ==/UserScript==

// Because of limited @include wildcard options, make sure the page is the right one
if (String(document.location).substr(7).lastIndexOf('/') == 10) {

// Change Thumbs Borders
var D = document;
D.styleSheets[0].insertRule("#mainImage {border:1px solid #BBBBBB !important; padding:2px !important; background:transparent !important}", 0);

// Add Direct Image Link
var img = D.getElementById('mainImage');
if (img) {
	var lnk = D.createElement('DIV'), adr = D.createElement('A');
	adr.href = img.src;
	lnk.style.cssText = "clear:both;cursor:default;text-align:center;cursor:default;position:relative;top:-20px";
	lnk.appendChild(D.createTextNode("[ "));
	adr.appendChild(D.createTextNode("Direct Image Link"));
	lnk.appendChild(adr);
	lnk.appendChild(D.createTextNode(" ]"));
	img.parentNode.parentNode.appendChild(lnk);
}

// Remove bottom warning and Copyright (or rather lack of) notice
D.getElementById('footer').style.display = "none";
var n = D.getElementById('extra').firstChild;
while (n.textContent != "Removal") n = n.nextSibling;
while (n) {
	var t = n;
	n = t.nextSibling;
	t.parentNode.removeChild(t);
}
var t = D.getElementById('wrapper').childNodes[1].childNodes[1].firstChild;
t.parentNode.removeChild(t);
var t = D.getElementById('header').style.display = "none";

}
